import { Request, Response } from 'express';
import { CompraProduto } from '../models/CompraProduto';
import { Compra } from '../models/Compras';
import { Produto } from '../models/Produto';

export class CompraProdutoController {
  // Listar todas as associações de CompraProduto
  public async listarCompraProdutos(req: Request, res: Response): Promise<Response> {
    try {
      const compraProdutos = await CompraProduto.findAll({
        include: [Compra, Produto],
      });
      return res.status(200).json(compraProdutos);
    } catch (error) {
      console.error('Erro ao listar CompraProduto:', error);
      return res.status(500).json({ message: 'Erro ao listar CompraProduto', error });
    }
  }

  // Buscar uma associação específica por Compra_id e Prod_id
  public async buscarCompraProdutoPorId(req: Request, res: Response): Promise<Response> {
    const { compraId, produtoId } = req.params;

    try {
      const compraProduto = await CompraProduto.findOne({
        where: { Compra_id: compraId, Prod_id: produtoId },
        include: [Compra, Produto],
      });

      if (!compraProduto) {
        return res.status(404).json({ message: 'CompraProduto não encontrada' });
      }

      return res.status(200).json(compraProduto);
    } catch (error) {
      console.error('Erro ao buscar CompraProduto:', error);
      return res.status(500).json({ message: 'Erro ao buscar CompraProduto', error });
    }
  }

  // Criar uma nova associação CompraProduto
  public async criarCompraProduto(req: Request, res: Response): Promise<Response> {
    const { Compra_id, Prod_id, Quantidade } = req.body;

    try {
      const novaCompraProduto = await CompraProduto.create({
        Compra_id,
        Prod_id,
        Quantidade,
      });

      return res.status(201).json(novaCompraProduto);
    } catch (error) {
      console.error('Erro ao criar CompraProduto:', error);
      return res.status(500).json({ message: 'Erro ao criar CompraProduto', error });
    }
  }

  // Atualizar a quantidade em CompraProduto
  public async atualizarCompraProduto(req: Request, res: Response): Promise<Response> {
    const { compraId, produtoId } = req.params;
    const { Quantidade } = req.body;

    try {
      const compraProduto = await CompraProduto.findOne({
        where: { Compra_id: compraId, Prod_id: produtoId },
      });

      if (!compraProduto) {
        return res.status(404).json({ message: 'CompraProduto não encontrada' });
      }

      await compraProduto.update({ Quantidade });
      return res.status(200).json(compraProduto);
    } catch (error) {
      console.error('Erro ao atualizar CompraProduto:', error);
      return res.status(500).json({ message: 'Erro ao atualizar CompraProduto', error });
    }
  }

  // Deletar uma associação CompraProduto
  public async deletarCompraProduto(req: Request, res: Response): Promise<Response> {
    const { compraId, produtoId } = req.params;

    try {
      const compraProduto = await CompraProduto.findOne({
        where: { Compra_id: compraId, Prod_id: produtoId },
      });

      if (!compraProduto) {
        return res.status(404).json({ message: 'CompraProduto não encontrada' });
      }

      await compraProduto.destroy();
      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar CompraProduto:', error);
      return res.status(500).json({ message: 'Erro ao deletar CompraProduto', error });
    }
  }
}
