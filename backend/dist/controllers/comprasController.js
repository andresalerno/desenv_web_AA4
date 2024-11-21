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
const Fornecedor_1 = require("../models/Fornecedor");
const CompraProduto_1 = require("../models/CompraProduto");
const CompraFornecedor_1 = require("../models/CompraFornecedor");
class CompraController {
    // Listar todas as compras
    listarCompras(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const compras = yield Compras_1.Compra.findAll({
                    include: [Produto_1.Produto, Fornecedor_1.Fornecedor],
                });
                return res.status(200).json(compras);
            }
            catch (error) {
                console.error('Erro ao listar compras:', error);
                return res.status(500).json({ message: 'Erro ao listar compras', error });
            }
        });
    }
    // Buscar compra por ID
    buscarCompraPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const compra = yield Compras_1.Compra.findByPk(id, {
                    include: [Produto_1.Produto, Fornecedor_1.Fornecedor],
                });
                if (!compra) {
                    return res.status(404).json({ message: 'Compra não encontrada' });
                }
                return res.status(200).json(compra);
            }
            catch (error) {
                console.error('Erro ao buscar compra:', error);
                return res.status(500).json({ message: 'Erro ao buscar compra', error });
            }
        });
    }
    // Criar uma nova compra
    criarCompra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Compra_data, Compra_total, fornecedores, produtos } = req.body;
            try {
                // Criação da compra
                const novaCompra = yield Compras_1.Compra.create({
                    Compra_data,
                    Compra_total,
                });
                // Associando fornecedores à compra
                if (fornecedores && fornecedores.length > 0) {
                    for (const fornecedorId of fornecedores) {
                        yield CompraFornecedor_1.CompraFornecedor.create({
                            Compra_id: novaCompra.Compra_id,
                            Forn_id: fornecedorId,
                        });
                    }
                }
                // Associando produtos à compra
                if (produtos && produtos.length > 0) {
                    for (const produto of produtos) {
                        yield CompraProduto_1.CompraProduto.create({
                            Compra_id: novaCompra.Compra_id,
                            Prod_id: produto.Prod_id,
                            Quantidade: produto.Quantidade,
                        });
                    }
                }
                return res.status(201).json(novaCompra);
            }
            catch (error) {
                console.error('Erro ao criar compra:', error);
                return res.status(500).json({ message: 'Erro ao criar compra', error });
            }
        });
    }
    // public async atualizarCompra(req: Request, res: Response): Promise<Response> {
    //   const { id } = req.params;
    //   const { Compra_data, Compra_total, Forn_id } = req.body;
    //   try {
    //     const compra = await Compra.findByPk(id);
    //     compra.fornecedores.find
    //     const fornecedorcompra = await CompraFornecedor.findByPk(Forn_id, {include: CompraFornecedor});
    //     if (!compra) {
    //       return res.status(404).json({ message: 'Compra não encontrada' });
    //     }
    //     if (!fornecedorcompra) {
    //       return res.status(404).json({ message: 'Compra associada a fornecedor não encontrada' });
    //     }
    //     await compra.update({ Compra_data, Compra_total, CompraFornecedor: {Forn_id: Forn_id} });
    //     return res.status(200).json(compra);
    //   } catch (error) {
    //     console.error('Erro ao atualizar compra:', error);
    //     return res.status(500).json({ message: 'Erro ao atualizar compra', error });
    //   }
    // }
    atualizarCompra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { Compra_data, Compra_total, Forn_id } = req.body;
            try {
                // Buscar a compra pela chave primária, incluindo os fornecedores associados
                const compra = yield Compras_1.Compra.findByPk(id, { include: { model: Fornecedor_1.Fornecedor, through: { attributes: [] } } });
                if (!compra) {
                    return res.status(404).json({ message: 'Compra não encontrada' });
                }
                // Buscar o fornecedor pelo ID fornecido
                const fornecedor = yield Fornecedor_1.Fornecedor.findByPk(Forn_id);
                if (!fornecedor) {
                    return res.status(404).json({ message: 'Fornecedor não encontrado' });
                }
                // Atualizar os dados básicos da compra
                yield compra.update({ Compra_data, Compra_total });
                // Atualizar a associação na tabela intermediária
                yield compra.$set('fornecedores', [fornecedor]); // Sobrescreve as associações existentes
                return res.status(200).json({ message: 'Compra atualizada com sucesso', compra });
            }
            catch (error) {
                console.error('Erro ao atualizar compra:', error);
                return res.status(500).json({ message: 'Erro ao atualizar compra', error });
            }
        });
    }
    // Deletar uma compra
    deletarCompra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const compra = yield Compras_1.Compra.findByPk(id);
                if (!compra) {
                    return res.status(404).json({ message: 'Compra não encontrada' });
                }
                yield compra.destroy();
                return res.status(204).send();
            }
            catch (error) {
                console.error('Erro ao deletar compra:', error);
                return res.status(500).json({ message: 'Erro ao deletar compra', error });
            }
        });
    }
}
exports.CompraController = CompraController;
