"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const compraProdutoController_1 = require("../controllers/compraProdutoController");
const router = (0, express_1.Router)();
const compraProdutoController = new compraProdutoController_1.CompraProdutoController();
// Rota para associar um produto a uma compra
router.post('/', (req, res) => compraProdutoController.associarProdutoCompra(req, res));
// Rota para listar todos os produtos de uma compra
router.get('/:id', (req, res) => compraProdutoController.listarProdutosDaCompra(req, res));
exports.default = router;
