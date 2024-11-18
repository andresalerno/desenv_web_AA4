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
    // Método para associar um produto a uma compra
    associarProdutoCompra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Compra_id, Prod_id, Quantidade } = req.body; // Dados para associação
            try {
                const compra = yield Compras_1.Compra.findByPk(Compra_id);
                if (!compra) {
                    return res.status(404).json({ message: 'Compra não encontrada' });
                }
                const produto = yield Produto_1.Produto.findByPk(Prod_id);
                if (!produto) {
                    return res.status(404).json({ message: 'Produto não encontrado' });
                }
                // Cria a associação na tabela intermediária CompraProduto
                const associacao = yield Compra_produto_1.CompraProduto.create({
                    Compra_id,
                    Prod_id,
                    quantidade: Quantidade,
                });
                return res.status(201).json(associacao);
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao associar produto à compra', error });
            }
        });
    }
    // Método para listar os produtos de uma compra
    listarProdutosDaCompra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Compra_id } = req.params;
            try {
                const compra = yield Compras_1.Compra.findByPk(Compra_id, {
                    include: {
                        model: Produto_1.Produto,
                        through: { attributes: ['quantidade'] },
                    },
                });
                if (!compra) {
                    return res.status(404).json({ message: 'Compra não encontrada' });
                }
                return res.status(200).json(compra.produtos); // Retorna a lista de produtos associados à compra
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao listar produtos da compra', error });
            }
        });
    }
}
exports.CompraProdutoController = CompraProdutoController;
