import { Request, Response } from 'express';
import { Compra } from '../models/Compras';
import { Produto } from '../models/Produto';
import { CompraProduto } from '../models/Compra_produto';
import { Fornecedor } from '../models/Fornecedor';

export class CompraController {
  public async listarCompras(req: Request, res: Response): Promise<Response> {
    try {
      const compras = await Compra.findAll({
        include: [
          {
            model: CompraProduto,
            include: [
              {
                model: Produto,
                include: [
                  {
                    model: Fornecedor,
                    attributes: ['Forn_id', 'Forn_nome'],
                  },
                ],
              },
            ],
          },
        ],
      });
  
      // Formatar a resposta para incluir informações de fornecedor de forma mais fácil
      const comprasComFornecedores = compras.map((compra) => {
        return {
          ...compra.toJSON(),
          fornecedores: compra.produtos.map((produto: any) => produto.Fornecedor?.Forn_nome),
        };
      });
  
      return res.status(200).json(comprasComFornecedores);
    } catch (error) {
      console.error('Erro ao listar compras:', error);
      return res.status(500).json({ message: 'Erro ao listar compras', error });
    }
  }
  

  public async buscarCompraPorId(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const compra = await Compra.findByPk(id, {
        include: [
          {
            model: CompraProduto,
            include: [
              {
                model: Produto,
                include: [
                  {
                    model: Fornecedor,
                    attributes: ['Forn_id', 'Forn_nome'],
                  },
                ],
              },
            ],
          },
        ],
      });
  
      if (!compra) {
        return res.status(404).json({ message: 'Compra não encontrada' });
      }
  
      // Formatar a resposta para incluir fornecedores
      const compraComFornecedores = {
        ...compra.toJSON(),
        fornecedores: compra.produtos.map((produto: any) => produto.Fornecedor?.Forn_nome),
      };
  
      return res.status(200).json(compraComFornecedores);
    } catch (error) {
      console.error('Erro ao buscar compra:', error);
      return res.status(500).json({ message: 'Erro ao buscar compra', error });
    }
  }
  

  public async criarCompra(req: Request, res: Response): Promise<Response> {
    const { Compra_data, produtos } = req.body;
    if (!produtos || produtos.length === 0) {
      return res.status(400).json({ message: 'Produtos devem ser fornecidos' });
    }
    try {
      const novaCompra = await Compra.create({ Compra_data, Compra_total: 0 });

      const produtosIds = produtos.map((p) => p.Prod_id);
      const produtosEncontrados = await Produto.findAll({ where: { Prod_id: produtosIds } });

      let totalCompra = 0;
      for (const { Prod_id, Quantidade } of produtos) {
        const produto = produtosEncontrados.find((p) => p.Prod_id === Prod_id);
        if (!produto) {
          return res.status(404).json({ message: `Produto com ID ${Prod_id} não encontrado` });
        }

        await novaCompra.$add('produtos', Prod_id, { through: { Quantidade } });
        totalCompra += produto.Prod_preco * Quantidade;
      }

      await novaCompra.update({ Compra_total: totalCompra });
      return res.status(201).json(novaCompra);
    } catch (error) {
      console.error('Erro ao criar compra:', error);
      return res.status(500).json({ message: 'Erro ao criar compra', error });
    }
  }

  public async atualizarCompra(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { Compra_data, produtos } = req.body;

    if (!produtos || produtos.length === 0) {
      return res.status(400).json({ message: 'Produtos devem ser fornecidos' });
    }

    try {
      const compra = await Compra.findByPk(id);
      if (!compra) {
        return res.status(404).json({ message: 'Compra não encontrada' });
      }

      await compra.update({ Compra_data });

      const produtosIds = produtos.map((p) => p.Prod_id);
      const produtosEncontrados = await Produto.findAll({ where: { Prod_id: produtosIds } });

      let totalCompra = 0;
      await compra.$set('produtos', []);
      for (const { Prod_id, Quantidade } of produtos) {
        const produto = produtosEncontrados.find((p) => p.Prod_id === Prod_id);
        if (!produto) {
          return res.status(404).json({ message: `Produto com ID ${Prod_id} não encontrado` });
        }

        await compra.$add('produtos', Prod_id, { through: { Quantidade } });
        totalCompra += produto.Prod_preco * Quantidade;
      }

      await compra.update({ Compra_total: totalCompra });
      return res.status(200).json(compra);
    } catch (error) {
      console.error('Erro ao atualizar compra:', error);
      return res.status(500).json({ message: 'Erro ao atualizar compra', error });
    }
  }

  public async deletarCompra(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const compra = await Compra.findByPk(id);
      if (!compra) {
        return res.status(404).json({ message: 'Compra não encontrada' });
      }
      await compra.destroy();
      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar compra:', error);
      return res.status(500).json({ message: 'Erro ao deletar compra', error });
    }
  }
}
