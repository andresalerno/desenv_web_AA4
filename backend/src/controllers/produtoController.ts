import { Request, Response } from 'express';
import { Produto } from '../models/Produto';
import { Fornecedor } from '../models/Fornecedor';

export class ProdutoController {

  // Método para listar todos os produtos
  public async listarProdutos(req: Request, res: Response): Promise<Response> {
    try {
      const produtos = await Produto.findAll({
        include: [{
          model: Fornecedor,
          as: 'fornecedor'  // Alias de associação deve ser 'fornecedor'
        }]
      });
      return res.status(200).json(produtos);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar produtos', error });
    }
  }

  // Método para buscar um produto por ID
  public async buscarProdutoPorId(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const produto = await Produto.findByPk(id, {
        include: [{
          model: Fornecedor,
          as: 'fornecedor'  // Alias de associação deve ser 'fornecedor'
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

  public async criarProduto(req: Request, res: Response): Promise<Response> {
    const { Prod_nome, Prod_descricao, Prod_preco, Prod_custo, Prod_marca, Prod_modelo, FornecedorId } = req.body;
    
    try {
      const novoProduto = await Produto.create({
        Prod_nome,
        Prod_descricao,
        Prod_preco,
        Prod_custo,
        Prod_marca,
        Prod_modelo,
        Forn_id: FornecedorId,
      });
  
      return res.status(201).json(novoProduto);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar produto', error });
    }
  }
  

  // Método para atualizar um produto existente
  public async atualizarProduto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { Prod_nome, Prod_descricao, Prod_preco, Prod_custo, Prod_marca, Prod_modelo, FornecedorId } = req.body;
    try {
      const produto = await Produto.findByPk(id);
      if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }

      // Atualizando o produto
      await produto.update({
        Prod_nome,
        Prod_descricao,
        Prod_preco,
        Prod_custo,
        Prod_marca,
        Prod_modelo,
        Forn_id: FornecedorId // Atualizando a chave estrangeira
      });

      return res.status(200).json(produto);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar produto', error });
    }
  }

  // Método para deletar um produto
  public async deletarProduto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const produto = await Produto.findByPk(id);
      if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      await produto.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao deletar produto', error });
    }
  }
}
