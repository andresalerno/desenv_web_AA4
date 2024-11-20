"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fornecedorController_1 = require("../controllers/fornecedorController");
const router = (0, express_1.Router)();
const fornecedorController = new fornecedorController_1.FornecedorController();
// Rota para listar todos os fornecedores
router.get('/', (req, res) => fornecedorController.listarFornecedores(req, res));
// Rota para buscar um fornecedor por ID
router.get('/:id', (req, res) => fornecedorController.buscarFornecedorPorId(req, res));
// Rota para criar um novo fornecedor
router.post('/', (req, res) => fornecedorController.criarFornecedor(req, res));
// Rota para atualizar um fornecedor existente
router.put('/:id', (req, res) => fornecedorController.atualizarFornecedor(req, res));
// Rota para deletar um fornecedor
router.delete('/:id', (req, res) => fornecedorController.deletarFornecedor(req, res));
exports.default = router;
