import { Router } from 'express';
import { CompraFornecedorController } from '../controllers/compraFornecedorController';

const router = Router();
const compraFornecedorController = new CompraFornecedorController();

// Rota para listar todas as associações de compras e fornecedores
router.get('/', (req, res) => compraFornecedorController.listarCompraFornecedores(req, res));

// Rota para buscar uma associação de compra e fornecedor por ID
router.get('/:compraId/:fornecedorId', (req, res) => compraFornecedorController.buscarCompraFornecedorPorId(req, res));

// Rota para criar uma nova associação de compra e fornecedor
router.post('/', (req, res) => compraFornecedorController.criarCompraFornecedor(req, res));

// Rota para atualizar uma associação de compra e fornecedor
router.put('/:compraId/:fornecedorId', (req, res) => compraFornecedorController.atualizarCompraFornecedor(req, res));

// Rota para deletar uma associação de compra e fornecedor
router.delete('/:compraId/:fornecedorId', (req, res) => compraFornecedorController.deletarCompraFornecedor(req, res));

export default router;
