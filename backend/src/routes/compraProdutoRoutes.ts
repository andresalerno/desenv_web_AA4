import { Router } from "express";
import { CompraProdutoController } from "../controllers/compraProdutoController";

const router = Router();
const compraProdutoController = new CompraProdutoController();

// Rota para associar um produto a uma compra
router.post('/', (req, res) => compraProdutoController.associarProdutoCompra(req, res));

// Rota para listar todos os produtos de uma compra
router.get('/:id', (req, res) => compraProdutoController.listarProdutosDaCompra(req, res));

export default router;
