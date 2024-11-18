import express from 'express';
import { ProdutoController } from '../controllers/produtoController';

const router = express.Router();
const produtoController = new ProdutoController();

// Rotas para gerenciar produtos
router.post('/', produtoController.criarProduto);
router.get('/', produtoController.listarProdutos);
router.get('/:id', produtoController.buscarProdutoPorId);
router.put('/:id', produtoController.atualizarProduto);
router.delete('/:id', produtoController.deletarProduto);

export default router;
