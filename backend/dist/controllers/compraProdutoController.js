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
const Compra_produto_1 = require("../models/Compra_produto");
const Compras_1 = require("../models/Compras");
const Produto_1 = require("../models/Produto");
class CompraProdutoController {
    includeCompraProduto() {
        return [
            {
                model: Compras_1.Compra,
                as: 'compra',
            },
            {
                model: Produto_1.Produto,
                as: 'produto',
            }
        ];
    }
    listarCompraProdutos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const compraProdutos = yield Compra_produto_1.CompraProduto.findAll({
                    include: this.includeCompraProduto(),
                });
                return res.status(200).json(compraProdutos);
            }
            catch (error) {
                console.error('Erro ao listar compras de produtos:', error);
                return res.status(500).json({ message: 'Erro ao listar compras de produtos', error });
            }
        });
    }
    buscarCompraProdutoPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { compraId, produtoId } = req.params;
            // Verificar se os IDs são válidos
            if (isNaN(Number(compraId)) || isNaN(Number(produtoId))) {
                return res.status(400).json({ message: 'IDs inválidos fornecidos' });
            }
            try {
                const compraProduto = yield Compra_produto_1.CompraProduto.findOne({
                    where: {
                        Compra_id: compraId,
                        Prod_id: produtoId,
                    },
                    include: this.includeCompraProduto(),
                });
                if (!compraProduto) {
                    return res.status(404).json({ message: 'Associação de produto e compra não encontrada' });
                }
                return res.status(200).json(compraProduto);
            }
            catch (error) {
                console.error('Erro ao buscar associação de produto na compra:', error);
                return res.status(500).json({ message: 'Erro ao buscar associação de produto na compra', error });
            }
        });
    }
    criarCompraProduto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Compra_id, Prod_id, Quantidade } = req.body;
            // Verificar se Quantidade é um número positivo
            if (isNaN(Quantidade) || Quantidade <= 0) {
                return res.status(400).json({ message: 'Quantidade deve ser um número positivo' });
            }
            try {
                const compra = yield Compras_1.Compra.findByPk(Compra_id);
                if (!compra) {
                    return res.status(400).json({ message: `Compra com ID ${Compra_id} não encontrada.` });
                }
                const produto = yield Produto_1.Produto.findByPk(Prod_id);
                if (!produto) {
                    return res.status(400).json({ message: `Produto com ID ${Prod_id} não encontrado.` });
                }
                const novoRegistro = yield Compra_produto_1.CompraProduto.create({
                    Compra_id,
                    Prod_id,
                    Quantidade,
                });
                return res.status(201).json(novoRegistro);
            }
            catch (error) {
                console.error('Erro ao criar associação de produto na compra:', error);
                return res.status(500).json({ message: 'Erro ao criar associação de produto na compra', error });
            }
        });
    }
    atualizarCompraProduto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { compraId, produtoId } = req.params;
            const { Quantidade } = req.body;
            try {
                const compraProduto = yield Compra_produto_1.CompraProduto.findOne({
                    where: {
                        Compra_id: compraId,
                        Prod_id: produtoId
                    }
                });
                if (!compraProduto) {
                    return res.status(404).json({ message: 'Associação de produto e compra não encontrada' });
                }
                yield compraProduto.update({ Quantidade });
                return res.status(200).json(compraProduto);
            }
            catch (error) {
                console.error('Erro ao atualizar associação de produto na compra:', error);
                return res.status(500).json({ message: 'Erro ao atualizar associação de produto na compra', error });
            }
        });
    }
    deletarCompraProduto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { compraId, produtoId } = req.params;
            try {
                const compraProduto = yield Compra_produto_1.CompraProduto.findOne({
                    where: {
                        Compra_id: compraId,
                        Prod_id: produtoId
                    }
                });
                if (!compraProduto) {
                    return res.status(404).json({ message: 'Associação de produto e compra não encontrada' });
                }
                yield compraProduto.destroy();
                return res.status(200).json({ message: 'Associação de produto e compra deletada com sucesso' });
            }
            catch (error) {
                console.error('Erro ao deletar associação de produto na compra:', error);
                return res.status(500).json({ message: 'Erro ao deletar associação de produto na compra', error });
            }
        });
    }
}
exports.CompraProdutoController = CompraProdutoController;
