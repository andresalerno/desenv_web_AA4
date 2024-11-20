import express from 'express';
import comprasRoutes from './comprasRoutes';
import fornecedorRoutes from './fornecedorRoutes';
import produtoRoutes from './produtoRoutes';
import compraProdutoRoutes from './compraProdutoRoutes';
import compraFornecedorRoutes from './compraFornecedorRoutes';


const router = express.Router();

// Defina as rotas principais aqui
router.use('/compras', comprasRoutes);
router.use('/fornecedores', fornecedorRoutes);
router.use('/produtos', produtoRoutes);
router.use('/compra-produto', compraProdutoRoutes);
router.use('/compra-fornecedor', compraFornecedorRoutes);

export default router;
