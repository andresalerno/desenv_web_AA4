"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const compraProdutoController_1 = require("../controllers/compraProdutoController");
const router = (0, express_1.Router)();
const compraProdutoController = new compraProdutoController_1.CompraProdutoController();
// Rota para listar todas as associações de produtos em compras
router.get('/', (req, res) => compraProdutoController.listarCompraProdutos(req, res));
// Rota para buscar uma associação de produto por ID de compra e produto
router.get('/:compraId/:produtoId', (req, res) => compraProdutoController.buscarCompraProdutoPorId(req, res));
// Rota para criar uma nova associação de produto em uma compra
router.post('/', (req, res) => compraProdutoController.criarCompraProduto(req, res));
// Rota para atualizar a associação de produto em uma compra
router.put('/:compraId/:produtoId', (req, res) => compraProdutoController.atualizarCompraProduto(req, res));
// Rota para deletar a associação de um produto de uma compra
router.delete('/:compraId/:produtoId', (req, res) => compraProdutoController.deletarCompraProduto(req, res));
exports.default = router;
