import { Router } from 'express';
import { FornecedorController } from '../controllers/fornecedorController';

const router = Router();
const fornecedorController = new FornecedorController();

// Rota para listar todos os fornecedores
router.get('/', (req, res) => fornecedorController.listarFornecedores(req, res));

// Rota para buscar um fornecedor por ID
router.get('/:id', (req, res) => fornecedorController.buscarFornecedorPorId(req, res));

// Rota para criar um novo fornecedor
router.post('/', (req, res) => fornecedorController.criarFornecedor(req, res));

// Rota para atualizar um fornecedor existente
router.put('/:id', (req, res) => fornecedorController.atualizarFornecedor(req, res));

// Rota para deletar um fornecedor
router.delete('/:id', (req, res) => fornecedorController.deletarFornecedor(req, res));

export default router;
