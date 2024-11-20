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
    // Método para listar todas as associações de fornecedores em compras
    listarCompraFornecedores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const compraFornecedores = yield CompraFornecedor_1.CompraFornecedor.findAll({
                    include: [
                        {
                            model: Compras_1.Compra,
                            as: 'compra', // Alias da associação Compra
                        },
                        {
                            model: Fornecedor_1.Fornecedor,
                            as: 'fornecedor', // Alias da associação Fornecedor
                        }
                    ]
                });
                return res.status(200).json(compraFornecedores);
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao listar fornecedores em compras', error });
            }
        });
    }
    // Método para buscar uma associação de fornecedor por ID de compra e fornecedor
    buscarCompraFornecedorPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { compraId, fornecedorId } = req.params;
            try {
                const compraFornecedor = yield CompraFornecedor_1.CompraFornecedor.findOne({
                    where: {
                        Compra_id: compraId,
                        Forn_id: fornecedorId,
                    },
                    include: [
                        {
                            model: Compras_1.Compra,
                            as: 'compra',
                        },
                        {
                            model: Fornecedor_1.Fornecedor,
                            as: 'fornecedor',
                        }
                    ]
                });
                if (!compraFornecedor) {
                    return res.status(404).json({ message: 'Associação de fornecedor e compra não encontrada' });
                }
                return res.status(200).json(compraFornecedor);
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao buscar associação de fornecedor na compra', error });
            }
        });
    }
    // Método para criar uma nova associação de fornecedor a uma compra
    criarCompraFornecedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Compra_id, Forn_id } = req.body;
            try {
                const novoCompraFornecedor = yield CompraFornecedor_1.CompraFornecedor.create({
                    Compra_id,
                    Forn_id
                });
                return res.status(201).json(novoCompraFornecedor);
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao criar associação de fornecedor na compra', error });
            }
        });
    }
    // Método para atualizar uma associação de fornecedor em uma compra
    atualizarCompraFornecedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { compraId, fornecedorId } = req.params;
            const { Forn_id } = req.body; // Caso queira atualizar o fornecedor (caso necessário)
            try {
                const compraFornecedor = yield CompraFornecedor_1.CompraFornecedor.findOne({
                    where: {
                        Compra_id: compraId,
                        Forn_id: fornecedorId
                    }
                });
                if (!compraFornecedor) {
                    return res.status(404).json({ message: 'Associação de fornecedor e compra não encontrada' });
                }
                // Atualizando o fornecedor (ou outros campos, caso necessário)
                yield compraFornecedor.update({
                    Forn_id
                });
                return res.status(200).json(compraFornecedor);
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao atualizar associação de fornecedor na compra', error });
            }
        });
    }
    // Método para deletar uma associação de fornecedor de uma compra
    deletarCompraFornecedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { compraId, fornecedorId } = req.params;
            try {
                const compraFornecedor = yield CompraFornecedor_1.CompraFornecedor.findOne({
                    where: {
                        Compra_id: compraId,
                        Forn_id: fornecedorId
                    }
                });
                if (!compraFornecedor) {
                    return res.status(404).json({ message: 'Associação de fornecedor e compra não encontrada' });
                }
                // Deletando a associação
                yield compraFornecedor.destroy();
                return res.status(204).send();
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao deletar associação de fornecedor na compra', error });
            }
        });
    }
}
exports.CompraFornecedorController = CompraFornecedorController;
