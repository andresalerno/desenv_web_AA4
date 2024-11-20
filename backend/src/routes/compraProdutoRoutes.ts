import { Router } from 'express';
import { CompraProdutoController } from '../controllers/compraProdutoController';

const router = Router();
const compraProdutoController = new CompraProdutoController();

// Rota para listar todas as associações de produtos em compras
router.get('/', (req, res) => compraProdutoController.listarCompraProdutos(req, res));

// Rota para buscar uma associação de produto por ID de compra e produto
router.get('/:compraId/:produtoId', (req, res) => compraProdutoController.buscarCompraProdutoPorId(req, res));

// Rota para criar uma nova associação de produto em uma compra
router.post('/', (req, res) => compraProdutoController.criarCompraProduto(req, res));

// Rota para atualizar a associação de produto em uma compra
router.put('/:compraId/:produtoId', (req, res) => compraProdutoController.atualizarCompraProduto(req, res));

// Rota para deletar a associação de um produto de uma compra
router.delete('/:compraId/:produtoId', (req, res) => compraProdutoController.deletarCompraProduto(req, res));

export default router;
