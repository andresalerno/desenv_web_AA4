import { Router } from 'express';
import { CompraController } from '../controllers/comprasController';

const router = Router();
const compraController = new CompraController();

// Rota para listar todas as compras
router.get('/', (req, res) => compraController.listarCompras(req, res));

// Rota para buscar uma compra por ID
router.get('/:id', (req, res) => compraController.buscarCompraPorId(req, res));

// Rota para criar uma nova compra
router.post('/', (req, res) => compraController.criarCompra(req, res));

// Rota para atualizar uma compra existente
router.put('/:id', (req, res) => compraController.atualizarCompra(req, res));

// Rota para deletar uma compra
router.delete('/:id', (req, res) => compraController.deletarCompra(req, res));

export default router;
