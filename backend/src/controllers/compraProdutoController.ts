import { Request, Response } from 'express';
import { CompraProduto } from '../models/Compra_produto';
import { Compra } from '../models/Compras';
import { Produto } from '../models/Produto';

export class CompraProdutoController {

  // Método para associar um produto a uma compra
  public async associarProdutoCompra(req: Request, res: Response): Promise<Response> {
    const { Compra_id, Prod_id, Quantidade } = req.body; // Dados para associação

    try {
      const compra = await Compra.findByPk(Compra_id);
      if (!compra) {
        return res.status(404).json({ message: 'Compra não encontrada' });
      }

      const produto = await Produto.findByPk(Prod_id);
      if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }

      // Cria a associação na tabela intermediária CompraProduto
      const associacao = await CompraProduto.create({
        Compra_id,
        Prod_id,
        quantidade: Quantidade,
      });

      return res.status(201).json(associacao);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao associar produto à compra', error });
    }
  }

  // Método para listar os produtos de uma compra
  public async listarProdutosDaCompra(req: Request, res: Response): Promise<Response> {
    const { Compra_id } = req.params;

    try {
      const compra = await Compra.findByPk(Compra_id, {
        include: {
          model: Produto,
          through: { attributes: ['quantidade'] },
        },
      });

      if (!compra) {
        return res.status(404).json({ message: 'Compra não encontrada' });
      }

      return res.status(200).json(compra.produtos); // Retorna a lista de produtos associados à compra
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar produtos da compra', error });
    }
  }
}
