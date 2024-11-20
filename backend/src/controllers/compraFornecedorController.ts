import { Request, Response } from 'express';
import { CompraFornecedor } from '../models/CompraFornecedor';
import { Compra } from '../models/Compras';
import { Fornecedor } from '../models/Fornecedor';

export class CompraFornecedorController {

  // Método para listar todas as associações de fornecedores em compras
  public async listarCompraFornecedores(req: Request, res: Response): Promise<Response> {
    try {
      const compraFornecedores = await CompraFornecedor.findAll({
        include: [
          {
            model: Compra,
            as: 'compra', // Alias da associação Compra
          },
          {
            model: Fornecedor,
            as: 'fornecedor', // Alias da associação Fornecedor
          }
        ]
      });
      return res.status(200).json(compraFornecedores);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar fornecedores em compras', error });
    }
  }

  // Método para buscar uma associação de fornecedor por ID de compra e fornecedor
  public async buscarCompraFornecedorPorId(req: Request, res: Response): Promise<Response> {
    const { compraId, fornecedorId } = req.params;
    try {
      const compraFornecedor = await CompraFornecedor.findOne({
        where: {
          Compra_id: compraId,
          Forn_id: fornecedorId,
        },
        include: [
          {
            model: Compra,
            as: 'compra',
          },
          {
            model: Fornecedor,
            as: 'fornecedor',
          }
        ]
      });

      if (!compraFornecedor) {
        return res.status(404).json({ message: 'Associação de fornecedor e compra não encontrada' });
      }

      return res.status(200).json(compraFornecedor);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar associação de fornecedor na compra', error });
    }
  }

  // Método para criar uma nova associação de fornecedor a uma compra
  public async criarCompraFornecedor(req: Request, res: Response): Promise<Response> {
    const { Compra_id, Forn_id } = req.body;

    try {
      const novoCompraFornecedor = await CompraFornecedor.create({
        Compra_id,
        Forn_id
      });

      return res.status(201).json(novoCompraFornecedor);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar associação de fornecedor na compra', error });
    }
  }

  // Método para atualizar uma associação de fornecedor em uma compra
  public async atualizarCompraFornecedor(req: Request, res: Response): Promise<Response> {
    const { compraId, fornecedorId } = req.params;
    const { Forn_id } = req.body; // Caso queira atualizar o fornecedor (caso necessário)

    try {
      const compraFornecedor = await CompraFornecedor.findOne({
        where: {
          Compra_id: compraId,
          Forn_id: fornecedorId
        }
      });

      if (!compraFornecedor) {
        return res.status(404).json({ message: 'Associação de fornecedor e compra não encontrada' });
      }

      // Atualizando o fornecedor (ou outros campos, caso necessário)
      await compraFornecedor.update({
        Forn_id
      });

      return res.status(200).json(compraFornecedor);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar associação de fornecedor na compra', error });
    }
  }

  // Método para deletar uma associação de fornecedor de uma compra
  public async deletarCompraFornecedor(req: Request, res: Response): Promise<Response> {
    const { compraId, fornecedorId } = req.params;

    try {
      const compraFornecedor = await CompraFornecedor.findOne({
        where: {
          Compra_id: compraId,
          Forn_id: fornecedorId
        }
      });

      if (!compraFornecedor) {
        return res.status(404).json({ message: 'Associação de fornecedor e compra não encontrada' });
      }

      // Deletando a associação
      await compraFornecedor.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao deletar associação de fornecedor na compra', error });
    }
  }
}
