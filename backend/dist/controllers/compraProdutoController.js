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
exports.CompraProdutoController = void 0;
const CompraProduto_1 = require("../models/CompraProduto");
const Compras_1 = require("../models/Compras");
const Produto_1 = require("../models/Produto");
class CompraProdutoController {
    // Listar todas as associações de CompraProduto
    listarCompraProdutos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const compraProdutos = yield CompraProduto_1.CompraProduto.findAll({
                    include: [Compras_1.Compra, Produto_1.Produto],
                });
                return res.status(200).json(compraProdutos);
            }
            catch (error) {
                console.error('Erro ao listar CompraProduto:', error);
                return res.status(500).json({ message: 'Erro ao listar CompraProduto', error });
            }
        });
    }
    // Buscar uma associação específica por Compra_id e Prod_id
    buscarCompraProdutoPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { compraId, produtoId } = req.params;
            try {
                const compraProduto = yield CompraProduto_1.CompraProduto.findOne({
                    where: { Compra_id: compraId, Prod_id: produtoId },
                    include: [Compras_1.Compra, Produto_1.Produto],
                });
                if (!compraProduto) {
                    return res.status(404).json({ message: 'CompraProduto não encontrada' });
                }
                return res.status(200).json(compraProduto);
            }
            catch (error) {
                console.error('Erro ao buscar CompraProduto:', error);
                return res.status(500).json({ message: 'Erro ao buscar CompraProduto', error });
            }
        });
    }
    // Criar uma nova associação CompraProduto
    criarCompraProduto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Compra_id, Prod_id, Quantidade } = req.body;
            try {
                const novaCompraProduto = yield CompraProduto_1.CompraProduto.create({
                    Compra_id,
                    Prod_id,
                    Quantidade,
                });
                return res.status(201).json(novaCompraProduto);
            }
            catch (error) {
                console.error('Erro ao criar CompraProduto:', error);
                return res.status(500).json({ message: 'Erro ao criar CompraProduto', error });
            }
        });
    }
    // Atualizar a quantidade em CompraProduto
    atualizarCompraProduto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { compraId, produtoId } = req.params;
            const { Quantidade } = req.body;
            try {
                const compraProduto = yield CompraProduto_1.CompraProduto.findOne({
                    where: { Compra_id: compraId, Prod_id: produtoId },
                });
                if (!compraProduto) {
                    return res.status(404).json({ message: 'CompraProduto não encontrada' });
                }
                yield compraProduto.update({ Quantidade });
                return res.status(200).json(compraProduto);
            }
            catch (error) {
                console.error('Erro ao atualizar CompraProduto:', error);
                return res.status(500).json({ message: 'Erro ao atualizar CompraProduto', error });
            }
        });
    }
    // Deletar uma associação CompraProduto
    deletarCompraProduto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { compraId, produtoId } = req.params;
            try {
                const compraProduto = yield CompraProduto_1.CompraProduto.findOne({
                    where: { Compra_id: compraId, Prod_id: produtoId },
                });
                if (!compraProduto) {
                    return res.status(404).json({ message: 'CompraProduto não encontrada' });
                }
                yield compraProduto.destroy();
                return res.status(204).send();
            }
            catch (error) {
                console.error('Erro ao deletar CompraProduto:', error);
                return res.status(500).json({ message: 'Erro ao deletar CompraProduto', error });
            }
        });
    }
}
exports.CompraProdutoController = CompraProdutoController;
