import { Request, Response } from 'express';
import { Fornecedor } from '../models/Fornecedor';
import { Produto } from '../models/Produto';

export class FornecedorController {


  public async criarFornecedor(req: Request, res: Response): Promise<Response> {
    const { Forn_nome, Forn_razaoSocial, Forn_cnpj, Forn_status, ProdutosIds } = req.body;
    try {
      const novoFornecedor = await Fornecedor.create({
        Forn_nome,
        Forn_razaoSocial,
        Forn_cnpj,
        Forn_status
      });


      if (ProdutosIds && ProdutosIds.length > 0) {
        const produtos = await Produto.findAll({
          where: { Prod_id: ProdutosIds }
        });
        await novoFornecedor.$set('produtos', produtos);
      }

      return res.status(201).json(novoFornecedor);
    } catch (error) {
      console.error('Erro ao criar fornecedor:', error);
      return res.status(500).json({ message: 'Erro ao criar fornecedor', error });
    }
  }


  public async listarFornecedores(req: Request, res: Response): Promise<Response> {
    try {
      const fornecedores = await Fornecedor.findAll({
        include: [{
          model: Produto,
          through: { attributes: [] }, // Remove os atributos intermediários
          as: 'produtos' // Certifique-se de usar o alias configurado
        }]
      });
      return res.status(200).json(fornecedores);
    } catch (error) {
      console.error('Erro ao listar fornecedores:', error);
      return res.status(500).json({ message: 'Erro ao listar fornecedores', error });
    }
  }
  
  
  


  public async buscarFornecedorPorId(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const fornecedor = await Fornecedor.findByPk(id, {
        include: [{
          model: Produto,
          through: { attributes: [] }, 
          as: 'Produtos'
        }]
      });

      if (!fornecedor) {
        return res.status(404).json({ message: 'Fornecedor não encontrado' });
      }
      return res.status(200).json(fornecedor);
    } catch (error) {
      console.error('Erro ao buscar fornecedor:', error);
      return res.status(500).json({ message: 'Erro ao buscar fornecedor', error });
    }
  }


  public async atualizarFornecedor(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { Forn_nome, Forn_razaoSocial, Forn_cnpj, Forn_status, ProdutosIds } = req.body;
    try {
      const fornecedor = await Fornecedor.findByPk(id);
      if (!fornecedor) {
        return res.status(404).json({ message: 'Fornecedor não encontrado' });
      }

      await fornecedor.update({
        Forn_nome,
        Forn_razaoSocial,
        Forn_cnpj,
        Forn_status
      });


      if (ProdutosIds && ProdutosIds.length > 0) {
        const produtos = await Produto.findAll({
          where: { Prod_id: ProdutosIds }
        });
        await fornecedor.$set('produtos', produtos);
      }

      return res.status(200).json(fornecedor);
    } catch (error) {
      console.error('Erro ao atualizar fornecedor:', error);
      return res.status(500).json({ message: 'Erro ao atualizar fornecedor', error });
    }
  }


  public async deletarFornecedor(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const fornecedor = await Fornecedor.findByPk(id);
      if (!fornecedor) {
        return res.status(404).json({ message: 'Fornecedor não encontrado' });
      }
      await fornecedor.destroy(); 
      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar fornecedor:', error);
      return res.status(500).json({ message: 'Erro ao deletar fornecedor', error });
    }
  }
}
