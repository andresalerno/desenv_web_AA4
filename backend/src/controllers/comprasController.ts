import { Request, Response } from 'express';
import { Compra } from '../models/Compras';
import { Produto } from '../models/Produto';
import { Fornecedor } from '../models/Fornecedor';
import { CompraProduto } from '../models/CompraProduto';
import { CompraFornecedor } from '../models/CompraFornecedor';

export class CompraController {
  // Listar todas as compras
  public async listarCompras(req: Request, res: Response): Promise<Response> {
    try {
      const compras = await Compra.findAll({
        include: [Produto, Fornecedor],
      });
      return res.status(200).json(compras);
    } catch (error) {
      console.error('Erro ao listar compras:', error);
      return res.status(500).json({ message: 'Erro ao listar compras', error });
    }
  }

  // Buscar compra por ID
  public async buscarCompraPorId(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const compra = await Compra.findByPk(id, {
        include: [Produto, Fornecedor],
      });

      if (!compra) {
        return res.status(404).json({ message: 'Compra não encontrada' });
      }

      return res.status(200).json(compra);
    } catch (error) {
      console.error('Erro ao buscar compra:', error);
      return res.status(500).json({ message: 'Erro ao buscar compra', error });
    }
  }

  // Criar uma nova compra
  public async criarCompra(req: Request, res: Response): Promise<Response> {
    const { Compra_data, Compra_total, fornecedores, produtos } = req.body;
  
    try {
      // Criação da compra
      const novaCompra = await Compra.create({
        Compra_data,
        Compra_total,
      });
  
      // Associando fornecedores à compra
      if (fornecedores && fornecedores.length > 0) {
        for (const fornecedorId of fornecedores) {
          await CompraFornecedor.create({
            Compra_id: novaCompra.Compra_id,
            Forn_id: fornecedorId,
          });
        }
      }
  
      // Associando produtos à compra
      if (produtos && produtos.length > 0) {
        for (const produto of produtos) {
          await CompraProduto.create({
            Compra_id: novaCompra.Compra_id,
            Prod_id: produto.Prod_id,
            Quantidade: produto.Quantidade,
          });
        }
      }
  
      return res.status(201).json(novaCompra);
    } catch (error) {
      console.error('Erro ao criar compra:', error);
      return res.status(500).json({ message: 'Erro ao criar compra', error });
    }
  }


  // public async atualizarCompra(req: Request, res: Response): Promise<Response> {
  //   const { id } = req.params;
  //   const { Compra_data, Compra_total, Forn_id } = req.body;


  //   try {
  //     const compra = await Compra.findByPk(id);
      
  //     compra.fornecedores.find

  //     const fornecedorcompra = await CompraFornecedor.findByPk(Forn_id, {include: CompraFornecedor});

  //     if (!compra) {
  //       return res.status(404).json({ message: 'Compra não encontrada' });
  //     }

  //     if (!fornecedorcompra) {
  //       return res.status(404).json({ message: 'Compra associada a fornecedor não encontrada' });
  //     }

  //     await compra.update({ Compra_data, Compra_total, CompraFornecedor: {Forn_id: Forn_id} });
  //     return res.status(200).json(compra);
  //   } catch (error) {
  //     console.error('Erro ao atualizar compra:', error);
  //     return res.status(500).json({ message: 'Erro ao atualizar compra', error });
  //   }
  // }

  public async atualizarCompra(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { Compra_data, Compra_total, Forn_id } = req.body;
  
    try {
      // Buscar a compra pela chave primária, incluindo os fornecedores associados
      const compra = await Compra.findByPk(id, { include: { model: Fornecedor, through: { attributes: [] } } });
  
      if (!compra) {
        return res.status(404).json({ message: 'Compra não encontrada' });
      }
  
      // Buscar o fornecedor pelo ID fornecido
      const fornecedor = await Fornecedor.findByPk(Forn_id);
  
      if (!fornecedor) {
        return res.status(404).json({ message: 'Fornecedor não encontrado' });
      }
  
      // Atualizar os dados básicos da compra
      await compra.update({ Compra_data, Compra_total });
  
      // Atualizar a associação na tabela intermediária
      await compra.$set('fornecedores', [fornecedor]); // Sobrescreve as associações existentes
  
      return res.status(200).json({ message: 'Compra atualizada com sucesso', compra });
    } catch (error) {
      console.error('Erro ao atualizar compra:', error);
      return res.status(500).json({ message: 'Erro ao atualizar compra', error });
    }
  }

  // Deletar uma compra
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
