import { Request, Response } from 'express';
import { CompraFornecedor } from '../models/CompraFornecedor';
import { Compra } from '../models/Compras';
import { Fornecedor } from '../models/Fornecedor';

export class CompraFornecedorController {
  // Listar todas as associações de CompraFornecedor
  public async listarCompraFornecedores(req: Request, res: Response): Promise<Response> {
    try {
      const compraFornecedores = await CompraFornecedor.findAll({
        include: [Compra, Fornecedor],
      });
      return res.status(200).json(compraFornecedores);
    } catch (error) {
      console.error('Erro ao listar CompraFornecedor:', error);
      return res.status(500).json({ message: 'Erro ao listar CompraFornecedor', error: error.message });
    }
  }

  // Buscar uma associação específica por Compra_id e Forn_id
  public async buscarCompraFornecedorPorId(req: Request, res: Response): Promise<Response> {
    const { compraId, fornecedorId } = req.params;

    try {
      const compraFornecedor = await CompraFornecedor.findOne({
        where: { Compra_id: compraId, Forn_id: fornecedorId },
        include: [Compra, Fornecedor],
      });

      if (!compraFornecedor) {
        return res.status(404).json({ message: 'CompraFornecedor não encontrada' });
      }

      return res.status(200).json(compraFornecedor);
    } catch (error) {
      console.error('Erro ao buscar CompraFornecedor:', error);
      return res.status(500).json({ message: 'Erro ao buscar CompraFornecedor', error: error.message });
    }
  }

  // Criar uma nova associação CompraFornecedor
  public async criarCompraFornecedor(req: Request, res: Response): Promise<Response> {
    const { Compra_id, Forn_id } = req.body;

    if (!Compra_id || !Forn_id) {
      return res.status(400).json({ message: 'Compra_id e Forn_id são obrigatórios' });
    }

    try {
      const novaCompraFornecedor = await CompraFornecedor.create({
        Compra_id,
        Forn_id,
      });

      return res.status(201).json(novaCompraFornecedor);
    } catch (error) {
      console.error('Erro ao criar CompraFornecedor:', error);
      return res.status(500).json({ message: 'Erro ao criar CompraFornecedor', error: error.message });
    }
  }

  // Atualizar um fornecedor associado a uma compra
  public async atualizarCompraFornecedor(req: Request, res: Response): Promise<Response> {
    const { compraId, fornecedorId } = req.params;
    const { Forn_id } = req.body;

    if (!Forn_id) {
      return res.status(400).json({ message: 'Forn_id é obrigatório' });
    }

    try {
      const compraFornecedor = await CompraFornecedor.findOne({
        where: { Compra_id: compraId, Forn_id: fornecedorId },
      });

      if (!compraFornecedor) {
        return res.status(404).json({ message: 'CompraFornecedor não encontrada' });
      }

      await compraFornecedor.update({ Forn_id });
      return res.status(200).json(compraFornecedor);
    } catch (error) {
      console.error('Erro ao atualizar CompraFornecedor:', error);
      return res.status(500).json({ message: 'Erro ao atualizar CompraFornecedor', error: error.message });
    }
  }

  // Deletar uma associação CompraFornecedor
  public async deletarCompraFornecedor(req: Request, res: Response): Promise<Response> {
    const { compraId, fornecedorId } = req.params;

    try {
      const compraFornecedor = await CompraFornecedor.findOne({
        where: { Compra_id: compraId, Forn_id: fornecedorId },
      });

      if (!compraFornecedor) {
        return res.status(404).json({ message: 'CompraFornecedor não encontrada' });
      }

      await compraFornecedor.destroy();
      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar CompraFornecedor:', error);
      return res.status(500).json({ message: 'Erro ao deletar CompraFornecedor', error: error.message });
    }
  }
}
