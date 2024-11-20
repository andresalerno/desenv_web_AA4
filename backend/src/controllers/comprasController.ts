import { Request, Response } from 'express';
import { Compra } from '../models/Compras';
import { Produto } from '../models/Produto';
import { CompraProduto } from '../models/Compra_produto';
import { Fornecedor } from '../models/Fornecedor';
import { CompraFornecedor } from '../models/CompraFornecedor';

export class CompraController {

  // Método para listar todas as compras com seus produtos e fornecedores associados
  public async listarCompras(req: Request, res: Response): Promise<Response> {
    try {
      const compras = await Compra.findAll({
        include: [
          {
            model: Produto,
            as: 'produtos', // Alias da associação
            through: { attributes: ['Quantidade'] }, // Atribui a quantidade na tabela intermediária
          },
          {
            model: Fornecedor,
            as: 'fornecedores', // Alias de associação com fornecedores
            through: { attributes: [] }, // Ignora a tabela intermediária
          }
        ]
      });
      return res.status(200).json(compras);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar compras', error });
    }
  }

  // Método para buscar uma compra por ID, incluindo produtos e fornecedores associados
  public async buscarCompraPorId(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const compra = await Compra.findByPk(id, {
        include: [
          {
            model: Produto,
            as: 'produtos', // Alias da associação
            through: { attributes: ['Quantidade'] }, // Atribui a quantidade na tabela intermediária
          },
          {
            model: Fornecedor,
            as: 'fornecedores', // Alias de associação com fornecedores
            through: { attributes: [] }, // Ignora a tabela intermediária
          }
        ]
      });

      if (!compra) {
        return res.status(404).json({ message: 'Compra não encontrada' });
      }

      return res.status(200).json(compra);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar compra', error });
    }
  }

  public async criarCompra(req: Request, res: Response): Promise<Response> {
    const { Prod_id, Forn_id, Quantidade, Compra_data, Compra_total } = req.body;
    console.log(req.body);
    try {
      // Buscar o produto pelo nome
      const produto = await Produto.findOne({ where: { Prod_id: Prod_id } });
      if (!produto) {
        return res.status(400).json({ message: `Produto ${Prod_id} não encontrado.` });
      }
  
      // Buscar o fornecedor pelo nome
      const fornecedor = await Fornecedor.findOne({ where: { Forn_id: Forn_id } });
      if (!fornecedor) {
        return res.status(400).json({ message: `Fornecedor ${Forn_id} não encontrado.` });
      }
  
      
      const novaCompra = await Compra.create({
        Compra_data,
        Compra_total,
      });
  
      // Criar associação com Produto e registrar a quantidade na tabela intermediária
      await CompraProduto.create({
        Compra_id: novaCompra.Compra_id,
        Prod_id: produto.Prod_id,
        Quantidade,
      });
  
      // Criar associação com Fornecedor
      await CompraFornecedor.create({
        Compra_id: novaCompra.Compra_id,
        Forn_id: fornecedor.Forn_id,
      });
  
      return res.status(201).json(novaCompra);
    } catch (error) {
      console.error('Erro ao criar compra:', error);
      return res.status(500).json({ message: 'Erro ao registrar a compra', error });
    }
  }
  
  

  // Método para atualizar uma compra existente e suas associações com produtos e fornecedores
  public async atualizarCompra(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { Compra_data, Compra_total, produtos, fornecedores } = req.body;

    try {
      const compra = await Compra.findByPk(id);
      if (!compra) {
        return res.status(404).json({ message: 'Compra não encontrada' });
      }

      // Atualizando a compra
      await compra.update({
        Compra_data,
        Compra_total,
      });

      // Atualizando associações de produtos (removendo as antigas e adicionando as novas)
      if (produtos && Array.isArray(produtos)) {
        // Removendo associações de produtos anteriores
        await CompraProduto.destroy({ where: { Compra_id: compra.Compra_id } });

        // Adicionando novas associações de produtos
        await Promise.all(
          produtos.map(async (produto: { id: number, quantidade: number }) => {
            await CompraProduto.create({
              Compra_id: compra.Compra_id,
              Prod_id: produto.id,
              Quantidade: produto.quantidade,
            });
          })
        );
      }

      // Atualizando associações de fornecedores (removendo as antigas e adicionando as novas)
      if (fornecedores && Array.isArray(fornecedores)) {
        // Removendo associações de fornecedores anteriores
        await CompraFornecedor.destroy({ where: { Compra_id: compra.Compra_id } });

        // Adicionando novas associações de fornecedores
        await Promise.all(
          fornecedores.map(async (fornecedorId: number) => {
            await CompraFornecedor.create({
              Compra_id: compra.Compra_id,
              Forn_id: fornecedorId,
            });
          })
        );
      }

      return res.status(200).json(compra);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar compra', error });
    }
  }

  // Método para deletar uma compra e suas associações com produtos e fornecedores
  public async deletarCompra(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const compra = await Compra.findByPk(id);
      if (!compra) {
        return res.status(404).json({ message: 'Compra não encontrada' });
      }

      // Remover as associações de produtos e fornecedores antes de deletar a compra
      await CompraProduto.destroy({ where: { Compra_id: compra.Compra_id } });
      await CompraFornecedor.destroy({ where: { Compra_id: compra.Compra_id } });

      // Deletar a compra
      await compra.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao deletar compra', error });
    }
  }
}
