import { Router } from 'express';
import { CompraController } from '../controllers/comprasController';

const router = Router();
const comprasController = new CompraController();

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

export default router;
