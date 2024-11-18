"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comprasController_1 = require("../controllers/comprasController");
const router = (0, express_1.Router)();
const comprasController = new comprasController_1.CompraController();
// Rota para listar todas as compras
router.get('/', (req, res) => comprasController.listarCompras(req, res));
// Rota para criar uma nova compra
router.post('/', (req, res) => comprasController.criarCompra(req, res));
// Rota para buscar uma compra por ID
router.get('/:id', (req, res) => comprasController.buscarCompraPorId(req, res));
// Rota para atualizar uma compra existente
router.put('/:id', (req, res) => comprasController.atualizarCompra(req, res));
// Rota para excluir uma compra por ID
router.delete('/:id', (req, res) => comprasController.deletarCompra(req, res));
exports.default = router;
