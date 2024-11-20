import { Router } from 'express';
import { ProdutoController } from '../controllers/produtoController';

const router = Router();
const produtoController = new ProdutoController();

// Rota para listar todos os produtos
router.get('/', (req, res) => produtoController.listarProdutos(req, res));

// Rota para buscar um produto por ID
router.get('/:id', (req, res) => produtoController.buscarProdutoPorId(req, res));

// Rota para criar um novo produto
router.post('/', (req, res) => produtoController.criarProduto(req, res));

// Rota para atualizar um produto existente
router.put('/:id', (req, res) => produtoController.atualizarProduto(req, res));

// Rota para deletar um produto
router.delete('/:id', (req, res) => produtoController.deletarProduto(req, res));

export default router;
