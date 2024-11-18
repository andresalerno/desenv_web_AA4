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
class CompraController {
    // Método para listar todas as compras
    listarCompras(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const compras = yield Compras_1.Compra.findAll({
                    include: [{
                            model: Produto_1.Produto,
                            through: { attributes: ['Quantidade'] }, // Inclui a quantidade de cada produto na compra
                        }]
                });
                return res.status(200).json(compras);
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao listar compras', error });
            }
        });
    }
    // Método para buscar uma compra por ID
    buscarCompraPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const compra = yield Compras_1.Compra.findByPk(id, {
                    include: [{
                            model: Produto_1.Produto,
                            through: { attributes: ['Quantidade'] }, // Inclui a quantidade de cada produto na compra
                        }]
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
            const { Compra_data, produtos } = req.body; // Recebe a data da compra e os produtos
            try {
                // Criação inicial da compra
                const novaCompra = yield Compras_1.Compra.create({
                    Compra_data,
                    Compra_total: 0, // Inicialmente zero
                });
                let totalCompra = 0;
                // Adiciona os produtos à compra
                for (const { Prod_id, Quantidade } of produtos) {
                    const produto = yield Produto_1.Produto.findByPk(Prod_id);
                    if (!produto) {
                        return res.status(404).json({ message: `Produto com ID ${Prod_id} não encontrado` });
                    }
                    yield novaCompra.$add('produtos', Prod_id, { through: { Quantidade } });
                    // Calcula o total da compra
                    totalCompra += produto.Prod_preco * Quantidade;
                }
                // Atualiza o total da compra
                yield novaCompra.update({ Compra_total: totalCompra });
                // Retorna a compra criada
                return res.status(201).json(novaCompra);
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao criar compra', error });
            }
        });
    }
    // Método para atualizar uma compra existente
    atualizarCompra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { Compra_data, produtos } = req.body; // produtos é um array de objetos com produto e quantidade
            try {
                const compra = yield Compras_1.Compra.findByPk(id);
                if (!compra) {
                    return res.status(404).json({ message: 'Compra não encontrada' });
                }
                // Atualiza os dados da compra
                yield compra.update({
                    Compra_data,
                });
                // Atualiza os produtos da compra
                let totalCompra = 0;
                yield compra.$set('produtos', []); // Limpa os produtos existentes (substitui por um array vazio)
                for (let produto of produtos) {
                    const { Prod_id, Quantidade } = produto;
                    const produtoCompra = yield Produto_1.Produto.findByPk(Prod_id);
                    if (!produtoCompra) {
                        return res.status(404).json({ message: `Produto com ID ${Prod_id} não encontrado` });
                    }
                    // Associa os produtos à compra
                    yield compra.$add('produtos', Prod_id, {
                        through: { Quantidade }
                    });
                    // Calcula o novo total da compra
                    totalCompra += produtoCompra.Prod_preco * Quantidade;
                }
                // Atualiza o total da compra
                yield compra.update({ Compra_total: totalCompra });
                return res.status(200).json(compra);
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao atualizar compra', error });
            }
        });
    }
    // Método para deletar uma compra
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
                return res.status(500).json({ message: 'Erro ao deletar compra', error });
            }
        });
    }
}
exports.CompraController = CompraController;
