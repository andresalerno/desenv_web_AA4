import { Router } from 'express';
import { FornecedorController } from '../controllers/fornecedorController';

const fornecedorController = new FornecedorController();
const router = Router();


router.post('/', fornecedorController.criarFornecedor);


router.get('/', fornecedorController.listarFornecedores);


router.get('/:id', fornecedorController.buscarFornecedorPorId);


router.put('/:id', fornecedorController.atualizarFornecedor);


router.delete('/:id', fornecedorController.deletarFornecedor);

export default router;
