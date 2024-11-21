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
exports.ProdutoController = void 0;
const Produto_1 = require("../models/Produto");
const Fornecedor_1 = require("../models/Fornecedor");
const FornecedorProduto_1 = require("../models/FornecedorProduto");
class ProdutoController {
    // Método para listar todos os produtos com seus fornecedores associados
    listarProdutos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const produtos = yield Produto_1.Produto.findAll({
                    include: [{
                            model: Fornecedor_1.Fornecedor,
                            as: 'fornecedores', // Alias da associação
                            through: { attributes: [] }, // Definindo a tabela intermediária e sem retornar seus dados
                        }]
                });
                return res.status(200).json(produtos);
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao listar produtos', error });
            }
        });
    }
    // Método para buscar um produto por ID, incluindo fornecedores associados
    buscarProdutoPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const produto = yield Produto_1.Produto.findByPk(id, {
                    include: [{
                            model: Fornecedor_1.Fornecedor,
                            as: 'fornecedores', // Alias da associação
                            through: { attributes: [] }, // Definindo a tabela intermediária e sem retornar seus dados
                        }]
                });
                if (!produto) {
                    return res.status(404).json({ message: 'Produto não encontrado' });
                }
                return res.status(200).json(produto);
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao buscar produto', error });
            }
        });
    }
    // Método para criar um novo produto e associá-lo a fornecedores
    criarProduto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Prod_nome, Prod_descricao, Prod_preco, Prod_custo, Prod_marca, Prod_modelo, FornecedorId } = req.body; // fornecedores é um array de IDs
            try {
                // Criação do novo produto
                const novoProduto = yield Produto_1.Produto.create({
                    Prod_nome,
                    Prod_descricao,
                    Prod_preco,
                    Prod_custo,
                    Prod_marca,
                    Prod_modelo,
                    FornecedorId
                });
                if (FornecedorId) {
                    yield FornecedorProduto_1.FornecedorProduto.create({
                        Prod_id: novoProduto.Prod_id,
                        Forn_id: FornecedorId,
                    });
                }
                return res.status(201).json(novoProduto);
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao criar produto', error });
            }
        });
    }
    // Método para atualizar um produto existente e atualizar suas associações com fornecedores
    atualizarProduto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { Prod_nome, Prod_descricao, Prod_preco, Prod_custo, Prod_marca, Prod_modelo, fornecedores } = req.body;
            try {
                const produto = yield Produto_1.Produto.findByPk(id);
                if (!produto) {
                    return res.status(404).json({ message: 'Produto não encontrado' });
                }
                // Atualizando as informações do produto
                yield produto.update({
                    Prod_nome,
                    Prod_descricao,
                    Prod_preco,
                    Prod_custo,
                    Prod_marca,
                    Prod_modelo,
                });
                // Atualizando as associações com fornecedores (substituindo)
                if (fornecedores && Array.isArray(fornecedores)) {
                    // Remover associações antigas
                    yield FornecedorProduto_1.FornecedorProduto.destroy({ where: { Prod_id: produto.Prod_id } });
                    // Adicionar novas associações
                    yield Promise.all(fornecedores.map((fornecedorId) => __awaiter(this, void 0, void 0, function* () {
                        yield FornecedorProduto_1.FornecedorProduto.create({
                            Prod_id: produto.Prod_id,
                            Forn_id: fornecedorId,
                        });
                    })));
                }
                return res.status(200).json(produto);
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao atualizar produto', error });
            }
        });
    }
    // Método para deletar um produto e remover suas associações com fornecedores
    deletarProduto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const produto = yield Produto_1.Produto.findByPk(id);
                if (!produto) {
                    return res.status(404).json({ message: 'Produto não encontrado' });
                }
                // Remover as associações de fornecedores antes de deletar o produto
                yield FornecedorProduto_1.FornecedorProduto.destroy({ where: { Prod_id: produto.Prod_id } });
                // Deletar o produto
                yield produto.destroy();
                return res.status(204).send();
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao deletar produto', error });
            }
        });
    }
}
exports.ProdutoController = ProdutoController;
