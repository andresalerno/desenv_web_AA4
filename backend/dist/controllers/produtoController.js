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
class ProdutoController {
    // Método para listar todos os produtos
    listarProdutos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const produtos = yield Produto_1.Produto.findAll({
                    include: [{
                            model: Fornecedor_1.Fornecedor,
                            as: 'fornecedor' // Alias de associação deve ser 'fornecedor'
                        }]
                });
                return res.status(200).json(produtos);
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao listar produtos', error });
            }
        });
    }
    // Método para buscar um produto por ID
    buscarProdutoPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const produto = yield Produto_1.Produto.findByPk(id, {
                    include: [{
                            model: Fornecedor_1.Fornecedor,
                            as: 'fornecedor' // Alias de associação deve ser 'fornecedor'
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
    criarProduto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Prod_nome, Prod_descricao, Prod_preco, Prod_custo, Prod_marca, Prod_modelo, FornecedorId } = req.body;
            try {
                const novoProduto = yield Produto_1.Produto.create({
                    Prod_nome,
                    Prod_descricao,
                    Prod_preco,
                    Prod_custo,
                    Prod_marca,
                    Prod_modelo,
                    Forn_id: FornecedorId,
                });
                return res.status(201).json(novoProduto);
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao criar produto', error });
            }
        });
    }
    // Método para atualizar um produto existente
    atualizarProduto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { Prod_nome, Prod_descricao, Prod_preco, Prod_custo, Prod_marca, Prod_modelo, FornecedorId } = req.body;
            try {
                const produto = yield Produto_1.Produto.findByPk(id);
                if (!produto) {
                    return res.status(404).json({ message: 'Produto não encontrado' });
                }
                // Atualizando o produto
                yield produto.update({
                    Prod_nome,
                    Prod_descricao,
                    Prod_preco,
                    Prod_custo,
                    Prod_marca,
                    Prod_modelo,
                    Forn_id: FornecedorId // Atualizando a chave estrangeira
                });
                return res.status(200).json(produto);
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao atualizar produto', error });
            }
        });
    }
    // Método para deletar um produto
    deletarProduto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const produto = yield Produto_1.Produto.findByPk(id);
                if (!produto) {
                    return res.status(404).json({ message: 'Produto não encontrado' });
                }
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
