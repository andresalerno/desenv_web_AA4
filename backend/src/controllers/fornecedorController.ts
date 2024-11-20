import { Request, Response } from 'express';
import { Fornecedor } from '../models/Fornecedor';
import { Produto } from '../models/Produto';
import { FornecedorProduto } from '../models/FornecedorProduto';

export class FornecedorController {

  // Método para listar todos os fornecedores com seus produtos associados
  public async listarFornecedores(req: Request, res: Response): Promise<Response> {
    try {
      const fornecedores = await Fornecedor.findAll({
        include: [{
          model: Produto,
          as: 'produtos', // Alias da associação
          through: { attributes: [] }, // Ignora a tabela intermediária
        }]
      });
      return res.status(200).json(fornecedores);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar fornecedores', error });
    }
  }

  // Método para buscar um fornecedor por ID, incluindo produtos associados
  public async buscarFornecedorPorId(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const fornecedor = await Fornecedor.findByPk(id, {
        include: [{
          model: Produto,
          as: 'produtos', // Alias da associação
          through: { attributes: [] }, // Ignora a tabela intermediária
        }]
      });

      if (!fornecedor) {
        return res.status(404).json({ message: 'Fornecedor não encontrado' });
      }

      return res.status(200).json(fornecedor);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar fornecedor', error });
    }
  }

  // Método para criar um novo fornecedor e associá-lo a produtos
  public async criarFornecedor(req: Request, res: Response): Promise<Response> {
    
    try {
    
      const { Forn_nome, Forn_razaoSocial, Forn_cnpj, Forn_status } = req.body;

    
      // Criação do novo fornecedor
      const novoFornecedor = await Fornecedor.create({
        Forn_nome,
        Forn_razaoSocial,
        Forn_cnpj,
        Forn_status
      });

      // Associando produtos ao novo fornecedor
      const { produtos } = req.body;
      if (produtos && Array.isArray(produtos)) {
        await Promise.all(
          produtos.map(async (produtoId: number) => {
            await FornecedorProduto.create({
              Forn_id: novoFornecedor.Forn_id,
              Prod_id: produtoId,
            });
          })
        );
      }

      return res.status(201).json(novoFornecedor);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar fornecedor', error });
    }
  }

  public async atualizarFornecedor(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { Forn_nome, Forn_razaoSocial, Forn_cnpj, Forn_status, produtos } = req.body;
  
    try {
      // Buscar o fornecedor pelo ID
      const fornecedor = await Fornecedor.findByPk(id);
  
      // Verificar se o fornecedor existe
      if (!fornecedor) {
        return res.status(404).json({ message: 'Fornecedor não encontrado' });
      }
  
      // Atualizar as informações do fornecedor
      await fornecedor.update({
        Forn_nome: Forn_nome || fornecedor.Forn_nome, // Mantém valor atual se não for enviado
        Forn_razaoSocial: Forn_razaoSocial || fornecedor.Forn_razaoSocial,
        Forn_cnpj: Forn_cnpj || fornecedor.Forn_cnpj,
        Forn_status: Forn_status !== undefined ? Forn_status : fornecedor.Forn_status, // Verifica booleano explicitamente
      });
  
      // Atualizar as associações com produtos (se enviados)
      if (produtos && Array.isArray(produtos)) {
        // Remover associações antigas
        await FornecedorProduto.destroy({ where: { Forn_id: fornecedor.Forn_id } });
  
        // Adicionar novas associações
        await Promise.all(
          produtos.map(async (produtoId: number) => {
            await FornecedorProduto.create({
              Forn_id: fornecedor.Forn_id,
              Prod_id: produtoId,
            });
          })
        );
      }
  
      // Retornar o fornecedor atualizado
      const fornecedorAtualizado = await Fornecedor.findByPk(id, {
        include: [{ model: Produto }], // Inclui os produtos associados, se aplicável
      });
  
      return res.status(200).json(fornecedorAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar fornecedor:', error);
      return res.status(500).json({ message: 'Erro ao atualizar fornecedor', error });
    }
  }
  

  // Método para deletar um fornecedor e remover suas associações com produtos
  public async deletarFornecedor(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const fornecedor = await Fornecedor.findByPk(id);
      if (!fornecedor) {
        return res.status(404).json({ message: 'Fornecedor não encontrado' });
      }

      // Remover as associações de produtos antes de deletar o fornecedor
      await FornecedorProduto.destroy({ where: { Forn_id: fornecedor.Forn_id } });

      // Deletar o fornecedor
      await fornecedor.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao deletar fornecedor', error });
    }
  }
}
