"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comprasRoutes_1 = __importDefault(require("./comprasRoutes"));
const fornecedorRoutes_1 = __importDefault(require("./fornecedorRoutes"));
const produtoRoutes_1 = __importDefault(require("./produtoRoutes"));
const compraProdutoRoutes_1 = __importDefault(require("./compraProdutoRoutes"));
const compraFornecedorRoutes_1 = __importDefault(require("./compraFornecedorRoutes"));
const router = express_1.default.Router();
// Defina as rotas principais aqui
router.use('/compras', comprasRoutes_1.default);
router.use('/fornecedores', fornecedorRoutes_1.default);
router.use('/produtos', produtoRoutes_1.default);
router.use('/compra-produto', compraProdutoRoutes_1.default);
router.use('/compra-fornecedor', compraFornecedorRoutes_1.default);
exports.default = router;
