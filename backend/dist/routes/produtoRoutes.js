"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const produtoController_1 = require("../controllers/produtoController");
const router = express_1.default.Router();
const produtoController = new produtoController_1.ProdutoController();
// Rotas para gerenciar produtos
router.post('/', produtoController.criarProduto);
router.get('/', produtoController.listarProdutos);
router.get('/:id', produtoController.buscarProdutoPorId);
router.put('/:id', produtoController.atualizarProduto);
router.delete('/:id', produtoController.deletarProduto);
exports.default = router;
