import { Router } from 'express';
import { CompraProdutoController } from '../controllers/compraProdutoController';

const router = Router();
const compraProdutoController = new CompraProdutoController();

// Rota para listar todas as associações de CompraProduto
router.get('/', (req, res) => compraProdutoController.listarCompraProdutos(req, res));

// Rota para criar uma nova associação CompraProduto
router.post('/', (req, res) => compraProdutoController.criarCompraProduto(req, res));

// Rota para atualizar a quantidade em CompraProduto
router.put('/:compraId/:produtoId', (req, res) => compraProdutoController.atualizarCompraProduto(req, res));

// Rota para deletar uma associação CompraProduto
router.delete('/:compraId/:produtoId', (req, res) => compraProdutoController.deletarCompraProduto(req, res));

export default router;
