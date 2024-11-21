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
exports.CompraFornecedorController = void 0;
const CompraFornecedor_1 = require("../models/CompraFornecedor");
const Compras_1 = require("../models/Compras");
const Fornecedor_1 = require("../models/Fornecedor");
class CompraFornecedorController {
    // Listar todas as associações de CompraFornecedor
    listarCompraFornecedores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const compraFornecedores = yield CompraFornecedor_1.CompraFornecedor.findAll({
                    include: [Compras_1.Compra, Fornecedor_1.Fornecedor],
                });
                return res.status(200).json(compraFornecedores);
            }
            catch (error) {
                console.error('Erro ao listar CompraFornecedor:', error);
                return res.status(500).json({ message: 'Erro ao listar CompraFornecedor', error: error.message });
            }
        });
    }
    // Buscar uma associação específica por Compra_id e Forn_id
    buscarCompraFornecedorPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { compraId, fornecedorId } = req.params;
            try {
                const compraFornecedor = yield CompraFornecedor_1.CompraFornecedor.findOne({
                    where: { Compra_id: compraId, Forn_id: fornecedorId },
                    include: [Compras_1.Compra, Fornecedor_1.Fornecedor],
                });
                if (!compraFornecedor) {
                    return res.status(404).json({ message: 'CompraFornecedor não encontrada' });
                }
                return res.status(200).json(compraFornecedor);
            }
            catch (error) {
                console.error('Erro ao buscar CompraFornecedor:', error);
                return res.status(500).json({ message: 'Erro ao buscar CompraFornecedor', error: error.message });
            }
        });
    }
    // Criar uma nova associação CompraFornecedor
    criarCompraFornecedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Compra_id, Forn_id } = req.body;
            if (!Compra_id || !Forn_id) {
                return res.status(400).json({ message: 'Compra_id e Forn_id são obrigatórios' });
            }
            try {
                const novaCompraFornecedor = yield CompraFornecedor_1.CompraFornecedor.create({
                    Compra_id,
                    Forn_id,
                });
                return res.status(201).json(novaCompraFornecedor);
            }
            catch (error) {
                console.error('Erro ao criar CompraFornecedor:', error);
                return res.status(500).json({ message: 'Erro ao criar CompraFornecedor', error: error.message });
            }
        });
    }
    // Atualizar um fornecedor associado a uma compra
    atualizarCompraFornecedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { compraId, fornecedorId } = req.params;
            const { Forn_id } = req.body;
            if (!Forn_id) {
                return res.status(400).json({ message: 'Forn_id é obrigatório' });
            }
            try {
                const compraFornecedor = yield CompraFornecedor_1.CompraFornecedor.findOne({
                    where: { Compra_id: compraId, Forn_id: fornecedorId },
                });
                if (!compraFornecedor) {
                    return res.status(404).json({ message: 'CompraFornecedor não encontrada' });
                }
                yield compraFornecedor.update({ Forn_id });
                return res.status(200).json(compraFornecedor);
            }
            catch (error) {
                console.error('Erro ao atualizar CompraFornecedor:', error);
                return res.status(500).json({ message: 'Erro ao atualizar CompraFornecedor', error: error.message });
            }
        });
    }
    // Deletar uma associação CompraFornecedor
    deletarCompraFornecedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { compraId, fornecedorId } = req.params;
            try {
                const compraFornecedor = yield CompraFornecedor_1.CompraFornecedor.findOne({
                    where: { Compra_id: compraId, Forn_id: fornecedorId },
                });
                if (!compraFornecedor) {
                    return res.status(404).json({ message: 'CompraFornecedor não encontrada' });
                }
                yield compraFornecedor.destroy();
                return res.status(204).send();
            }
            catch (error) {
                console.error('Erro ao deletar CompraFornecedor:', error);
                return res.status(500).json({ message: 'Erro ao deletar CompraFornecedor', error: error.message });
            }
        });
    }
}
exports.CompraFornecedorController = CompraFornecedorController;
