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
exports.FornecedorController = void 0;
const Fornecedor_1 = require("../models/Fornecedor");
const Produto_1 = require("../models/Produto");
class FornecedorController {
    criarFornecedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Forn_nome, Forn_razaoSocial, Forn_cnpj, Forn_status, ProdutosIds } = req.body;
            try {
                const novoFornecedor = yield Fornecedor_1.Fornecedor.create({
                    Forn_nome,
                    Forn_razaoSocial,
                    Forn_cnpj,
                    Forn_status
                });
                if (ProdutosIds && ProdutosIds.length > 0) {
                    const produtos = yield Produto_1.Produto.findAll({
                        where: { Prod_id: ProdutosIds }
                    });
                    yield novoFornecedor.$set('produtos', produtos);
                }
                return res.status(201).json(novoFornecedor);
            }
            catch (error) {
                console.error('Erro ao criar fornecedor:', error);
                return res.status(500).json({ message: 'Erro ao criar fornecedor', error });
            }
        });
    }
    listarFornecedores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fornecedores = yield Fornecedor_1.Fornecedor.findAll({
                    include: [{
                            model: Produto_1.Produto,
                            through: { attributes: [] }, // Remove os atributos intermediários
                            as: 'produtos' // Certifique-se de usar o alias configurado
                        }]
                });
                return res.status(200).json(fornecedores);
            }
            catch (error) {
                console.error('Erro ao listar fornecedores:', error);
                return res.status(500).json({ message: 'Erro ao listar fornecedores', error });
            }
        });
    }
    buscarFornecedorPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const fornecedor = yield Fornecedor_1.Fornecedor.findByPk(id, {
                    include: [{
                            model: Produto_1.Produto,
                            through: { attributes: [] },
                            as: 'Produtos'
                        }]
                });
                if (!fornecedor) {
                    return res.status(404).json({ message: 'Fornecedor não encontrado' });
                }
                return res.status(200).json(fornecedor);
            }
            catch (error) {
                console.error('Erro ao buscar fornecedor:', error);
                return res.status(500).json({ message: 'Erro ao buscar fornecedor', error });
            }
        });
    }
    atualizarFornecedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { Forn_nome, Forn_razaoSocial, Forn_cnpj, Forn_status, ProdutosIds } = req.body;
            try {
                const fornecedor = yield Fornecedor_1.Fornecedor.findByPk(id);
                if (!fornecedor) {
                    return res.status(404).json({ message: 'Fornecedor não encontrado' });
                }
                yield fornecedor.update({
                    Forn_nome,
                    Forn_razaoSocial,
                    Forn_cnpj,
                    Forn_status
                });
                if (ProdutosIds && ProdutosIds.length > 0) {
                    const produtos = yield Produto_1.Produto.findAll({
                        where: { Prod_id: ProdutosIds }
                    });
                    yield fornecedor.$set('produtos', produtos);
                }
                return res.status(200).json(fornecedor);
            }
            catch (error) {
                console.error('Erro ao atualizar fornecedor:', error);
                return res.status(500).json({ message: 'Erro ao atualizar fornecedor', error });
            }
        });
    }
    deletarFornecedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const fornecedor = yield Fornecedor_1.Fornecedor.findByPk(id);
                if (!fornecedor) {
                    return res.status(404).json({ message: 'Fornecedor não encontrado' });
                }
                yield fornecedor.destroy();
                return res.status(204).send();
            }
            catch (error) {
                console.error('Erro ao deletar fornecedor:', error);
                return res.status(500).json({ message: 'Erro ao deletar fornecedor', error });
            }
        });
    }
}
exports.FornecedorController = FornecedorController;
