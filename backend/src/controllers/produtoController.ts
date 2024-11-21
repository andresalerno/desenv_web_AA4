import { Request, Response } from 'express';
import { Produto } from '../models/Produto';
import { Fornecedor } from '../models/Fornecedor';
import { FornecedorProduto } from '../models/FornecedorProduto';

export class ProdutoController {

  // Método para listar todos os produtos com seus fornecedores associados
  public async listarProdutos(req: Request, res: Response): Promise<Response> {
    try {
      const produtos = await Produto.findAll({
        include: [{
          model: Fornecedor,
          as: 'fornecedores', // Alias da associação
          through: { attributes: [] }, // Definindo a tabela intermediária e sem retornar seus dados
        }]
      });
      return res.status(200).json(produtos);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar produtos', error });
    }
  }

  // Método para buscar um produto por ID, incluindo fornecedores associados
  public async buscarProdutoPorId(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const produto = await Produto.findByPk(id, {
        include: [{
          model: Fornecedor,
          as: 'fornecedores', // Alias da associação
          through: { attributes: [] }, // Definindo a tabela intermediária e sem retornar seus dados
        }]
      });

      if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }

      return res.status(200).json(produto);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar produto', error });
    }
  }

  // Método para criar um novo produto e associá-lo a fornecedores
  public async criarProduto(req: Request, res: Response): Promise<Response> {
    const { Prod_nome, Prod_descricao, Prod_preco, Prod_custo, Prod_marca, Prod_modelo, FornecedorId } = req.body; // fornecedores é um array de IDs

    try {
      // Criação do novo produto
      const novoProduto = await Produto.create({
        Prod_nome,
        Prod_descricao,
        Prod_preco,
        Prod_custo,
        Prod_marca,
        Prod_modelo,
        FornecedorId
      });

      if (FornecedorId) {
        await FornecedorProduto.create({
          Prod_id: novoProduto.Prod_id,
          Forn_id: FornecedorId,
        });
      }

      return res.status(201).json(novoProduto);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar produto', error });
    }
  }

  // Método para atualizar um produto existente e atualizar suas associações com fornecedores
  public async atualizarProduto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { Prod_nome, Prod_descricao, Prod_preco, Prod_custo, Prod_marca, Prod_modelo, fornecedores } = req.body;

    try {
      const produto = await Produto.findByPk(id);
      if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }

      // Atualizando as informações do produto
      await produto.update({
        Prod_nome,
        Prod_descricao,
        Prod_preco,
        Prod_custo,
        Prod_marca,
        Prod_modelo,
      });

      // Atualizando as associações com fornecedores (substituindo)
      if (fornecedores && Array.isArray(fornecedores)) {
        // Remover associações antigas
        await FornecedorProduto.destroy({ where: { Prod_id: produto.Prod_id } });

        // Adicionar novas associações
        await Promise.all(
          fornecedores.map(async (fornecedorId: number) => {
            await FornecedorProduto.create({
              Prod_id: produto.Prod_id,
              Forn_id: fornecedorId,
            });
          })
        );
      }

      return res.status(200).json(produto);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar produto', error });
    }
  }

  // Método para deletar um produto e remover suas associações com fornecedores
  public async deletarProduto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const produto = await Produto.findByPk(id);
      if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }

      // Remover as associações de fornecedores antes de deletar o produto
      await FornecedorProduto.destroy({ where: { Prod_id: produto.Prod_id } });

      // Deletar o produto
      await produto.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao deletar produto', error });
    }
  }
}
