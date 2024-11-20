import { Request, Response } from 'express';
import { CompraProduto } from '../models/Compra_produto';
import { Compra } from '../models/Compras';
import { Produto } from '../models/Produto';

export class CompraProdutoController {

  private includeCompraProduto() {
    return [
      {
        model: Compra,
        as: 'compra',
      },
      {
        model: Produto,
        as: 'produto',
      }
    ];
  }

  public async listarCompraProdutos(req: Request, res: Response): Promise<Response> {
    try {
      const compraProdutos = await CompraProduto.findAll({
        include: this.includeCompraProduto(),
      });
      return res.status(200).json(compraProdutos);
    } catch (error) {
      console.error('Erro ao listar compras de produtos:', error);
      return res.status(500).json({ message: 'Erro ao listar compras de produtos', error });
    }
  }

  public async buscarCompraProdutoPorId(req: Request, res: Response): Promise<Response> {
    const { compraId, produtoId } = req.params;

    // Verificar se os IDs são válidos
    if (isNaN(Number(compraId)) || isNaN(Number(produtoId))) {
      return res.status(400).json({ message: 'IDs inválidos fornecidos' });
    }

    try {
      const compraProduto = await CompraProduto.findOne({
        where: {
          Compra_id: compraId,
          Prod_id: produtoId,
        },
        include: this.includeCompraProduto(),
      });

      if (!compraProduto) {
        return res.status(404).json({ message: 'Associação de produto e compra não encontrada' });
      }

      return res.status(200).json(compraProduto);
    } catch (error) {
      console.error('Erro ao buscar associação de produto na compra:', error);
      return res.status(500).json({ message: 'Erro ao buscar associação de produto na compra', error });
    }
  }

  public async criarCompraProduto(req: Request, res: Response): Promise<Response> {
    const { Compra_id, Prod_id, Quantidade } = req.body;

    // Verificar se Quantidade é um número positivo
    if (isNaN(Quantidade) || Quantidade <= 0) {
      return res.status(400).json({ message: 'Quantidade deve ser um número positivo' });
    }

    try {
      const compra = await Compra.findByPk(Compra_id);
      if (!compra) {
        return res.status(400).json({ message: `Compra com ID ${Compra_id} não encontrada.` });
      }

      const produto = await Produto.findByPk(Prod_id);
      if (!produto) {
        return res.status(400).json({ message: `Produto com ID ${Prod_id} não encontrado.` });
      }

      const novoRegistro = await CompraProduto.create({
        Compra_id,
        Prod_id,
        Quantidade,
      });

      return res.status(201).json(novoRegistro);
    } catch (error) {
      console.error('Erro ao criar associação de produto na compra:', error);
      return res.status(500).json({ message: 'Erro ao criar associação de produto na compra', error });
    }
  }

  public async atualizarCompraProduto(req: Request, res: Response): Promise<Response> {
    const { compraId, produtoId } = req.params;
    const { Quantidade } = req.body;

    try {
      const compraProduto = await CompraProduto.findOne({
        where: {
          Compra_id: compraId,
          Prod_id: produtoId
        }
      });

      if (!compraProduto) {
        return res.status(404).json({ message: 'Associação de produto e compra não encontrada' });
      }

      await compraProduto.update({ Quantidade });

      return res.status(200).json(compraProduto);
    } catch (error) {
      console.error('Erro ao atualizar associação de produto na compra:', error);
      return res.status(500).json({ message: 'Erro ao atualizar associação de produto na compra', error });
    }
  }

  public async deletarCompraProduto(req: Request, res: Response): Promise<Response> {
    const { compraId, produtoId } = req.params;

    try {
      const compraProduto = await CompraProduto.findOne({
        where: {
          Compra_id: compraId,
          Prod_id: produtoId
        }
      });

      if (!compraProduto) {
        return res.status(404).json({ message: 'Associação de produto e compra não encontrada' });
      }

      await compraProduto.destroy();

      return res.status(200).json({ message: 'Associação de produto e compra deletada com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar associação de produto na compra:', error);
      return res.status(500).json({ message: 'Erro ao deletar associação de produto na compra', error });
    }
  }
}
