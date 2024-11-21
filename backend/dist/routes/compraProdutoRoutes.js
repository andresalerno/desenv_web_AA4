"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const compraProdutoController_1 = require("../controllers/compraProdutoController");
const router = (0, express_1.Router)();
const compraProdutoController = new compraProdutoController_1.CompraProdutoController();
// Rota para listar todas as associações de CompraProduto
router.get('/', (req, res) => compraProdutoController.listarCompraProdutos(req, res));
// Rota para criar uma nova associação CompraProduto
router.post('/', (req, res) => compraProdutoController.criarCompraProduto(req, res));
// Rota para atualizar a quantidade em CompraProduto
router.put('/:compraId/:produtoId', (req, res) => compraProdutoController.atualizarCompraProduto(req, res));
// Rota para deletar uma associação CompraProduto
router.delete('/:compraId/:produtoId', (req, res) => compraProdutoController.deletarCompraProduto(req, res));
exports.default = router;
