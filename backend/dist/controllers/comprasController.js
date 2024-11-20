"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompraController = void 0;
const Compras_1 = require("../models/Compras");
const Produto_1 = require("../models/Produto");
const Compra_produto_1 = require("../models/Compra_produto");
const Fornecedor_1 = require("../models/Fornecedor");
const CompraFornecedor_1 = require("../models/CompraFornecedor");
class CompraController {
    // Método para listar todas as compras com seus produtos e fornecedores associados
    listarCompras(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const compras = yield Compras_1.Compra.findAll({
                    include: [
                        {
                            model: Produto_1.Produto,
                            as: 'produtos', // Alias da associação
                            through: { attributes: ['Quantidade'] }, // Atribui a quantidade na tabela intermediária
                        },
                        {
                            model: Fornecedor_1.Fornecedor,
                            as: 'fornecedores', // Alias de associação com fornecedores
                            through: { attributes: [] }, // Ignora a tabela intermediária
                        }
                    ]
                });
                return res.status(200).json(compras);
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao listar compras', error });
            }
        });
    }
    // Método para buscar uma compra por ID, incluindo produtos e fornecedores associados
    buscarCompraPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const compra = yield Compras_1.Compra.findByPk(id, {
                    include: [
                        {
                            model: Produto_1.Produto,
                            as: 'produtos', // Alias da associação
                            through: { attributes: ['Quantidade'] }, // Atribui a quantidade na tabela intermediária
                        },
                        {
                            model: Fornecedor_1.Fornecedor,
                            as: 'fornecedores', // Alias de associação com fornecedores
                            through: { attributes: [] }, // Ignora a tabela intermediária
                        }
                    ]
                });
                if (!compra) {
                    return res.status(404).json({ message: 'Compra não encontrada' });
                }
                return res.status(200).json(compra);
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao buscar compra', error });
            }
        });
    }
    criarCompra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Prod_id, Forn_id, Quantidade, Compra_data, Compra_total } = req.body;
            console.log(req.body);
            try {
                // Buscar o produto pelo nome
                const produto = yield Produto_1.Produto.findOne({ where: { Prod_id: Prod_id } });
                if (!produto) {
                    return res.status(400).json({ message: `Produto ${Prod_id} não encontrado.` });
                }
                // Buscar o fornecedor pelo nome
                const fornecedor = yield Fornecedor_1.Fornecedor.findOne({ where: { Forn_id: Forn_id } });
                if (!fornecedor) {
                    return res.status(400).json({ message: `Fornecedor ${Forn_id} não encontrado.` });
                }
                const novaCompra = yield Compras_1.Compra.create({
                    Compra_data,
                    Compra_total,
                });
                // Criar associação com Produto e registrar a quantidade na tabela intermediária
                yield Compra_produto_1.CompraProduto.create({
                    Compra_id: novaCompra.Compra_id,
                    Prod_id: produto.Prod_id,
                    Quantidade,
                });
                // Criar associação com Fornecedor
                yield CompraFornecedor_1.CompraFornecedor.create({
                    Compra_id: novaCompra.Compra_id,
                    Forn_id: fornecedor.Forn_id,
                });
                return res.status(201).json(novaCompra);
            }
            catch (error) {
                console.error('Erro ao criar compra:', error);
                return res.status(500).json({ message: 'Erro ao registrar a compra', error });
            }
        });
    }
    // Método para atualizar uma compra existente e suas associações com produtos e fornecedores
    atualizarCompra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { Compra_data, Compra_total, produtos, fornecedores } = req.body;
            try {
                const compra = yield Compras_1.Compra.findByPk(id);
                if (!compra) {
                    return res.status(404).json({ message: 'Compra não encontrada' });
                }
                // Atualizando a compra
                yield compra.update({
                    Compra_data,
                    Compra_total,
                });
                // Atualizando associações de produtos (removendo as antigas e adicionando as novas)
                if (produtos && Array.isArray(produtos)) {
                    // Removendo associações de produtos anteriores
                    yield Compra_produto_1.CompraProduto.destroy({ where: { Compra_id: compra.Compra_id } });
                    // Adicionando novas associações de produtos
                    yield Promise.all(produtos.map((produto) => __awaiter(this, void 0, void 0, function* () {
                        yield Compra_produto_1.CompraProduto.create({
                            Compra_id: compra.Compra_id,
                            Prod_id: produto.id,
                            Quantidade: produto.quantidade,
                        });
                    })));
                }
                // Atualizando associações de fornecedores (removendo as antigas e adicionando as novas)
                if (fornecedores && Array.isArray(fornecedores)) {
                    // Removendo associações de fornecedores anteriores
                    yield CompraFornecedor_1.CompraFornecedor.destroy({ where: { Compra_id: compra.Compra_id } });
                    // Adicionando novas associações de fornecedores
                    yield Promise.all(fornecedores.map((fornecedorId) => __awaiter(this, void 0, void 0, function* () {
                        yield CompraFornecedor_1.CompraFornecedor.create({
                            Compra_id: compra.Compra_id,
                            Forn_id: fornecedorId,
                        });
                    })));
                }
                return res.status(200).json(compra);
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao atualizar compra', error });
            }
        });
    }
    // Método para deletar uma compra e suas associações com produtos e fornecedores
    deletarCompra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const compra = yield Compras_1.Compra.findByPk(id);
                if (!compra) {
                    return res.status(404).json({ message: 'Compra não encontrada' });
                }
                // Remover as associações de produtos e fornecedores antes de deletar a compra
                yield Compra_produto_1.CompraProduto.destroy({ where: { Compra_id: compra.Compra_id } });
                yield CompraFornecedor_1.CompraFornecedor.destroy({ where: { Compra_id: compra.Compra_id } });
                // Deletar a compra
                yield compra.destroy();
                return res.status(204).send();
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao deletar compra', error });
            }
        });
    }
}
exports.CompraController = CompraController;
