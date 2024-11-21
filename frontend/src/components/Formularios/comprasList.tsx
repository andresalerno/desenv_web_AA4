import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

interface Produto {
  Prod_id: number;
  Prod_nome: string | null;
  Forn_id: string | null;
  Prod_preco?: number;
  [key: string]: any;
}

interface Compra {
  Compra_id: number;
  Compra_total: number;
  Compra_data: string | null;
  Forn_id?: string;
  produtos: Produto[];
  fornecedores: Fornecedor[];
}

interface Fornecedor {
  Forn_id: string;
  Forn_nome: string;
}

const ComprasList: React.FC = () => {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentCompra, setCurrentCompra] = useState<Compra | null>(null);

  const fetchCompras = async () => {
    try {
      const response = await axios.get<Compra[]>('http://localhost:5000/compras');
      setCompras(response.data);
    } catch (error) {
      console.error('Erro ao buscar compras:', error);
    } finally {
      setLoading(false);
    }
  };
  // Buscar lista de compras
  useEffect(() => {
    
    fetchCompras();
    console.log();
  }, []);

  // Buscar lista de fornecedores
  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await axios.get<Fornecedor[]>('http://localhost:5000/fornecedores');
        setFornecedores(response.data);
      } catch (error) {
        console.error('Erro ao buscar fornecedores:', error);
      }
    };
    fetchFornecedores();
  }, []);

  // Carregar fornecedores ao abrir o modal de edição
  const handleEditClick = (compra: Compra) => {
    setCurrentCompra(compra);
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    if (currentCompra) {
      try {
        // Substitua o nome do fornecedor pelo ID no momento da atualização
        await axios.put(
          `http://localhost:5000/compras/${currentCompra.Compra_id}`,
          currentCompra
        );
        setCompras((prev) =>
          prev.map((compra) =>
            compra.Compra_id === currentCompra.Compra_id ? currentCompra : compra
          )
        );
        alert('Compra atualizada com sucesso!');
        setShowEditModal(false);
        fetchCompras();
      } catch (error) {
        console.error('Erro ao atualizar compra:', error);
        alert('Erro ao atualizar compra');
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/compras/${id}`);
      setCompras((prevCompras) =>
        prevCompras.filter((compra) => compra.Compra_id !== id)
      );
      alert('Compra excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir compra:', error);
      alert('Erro ao excluir compra');
    }
  };

  const formatarMoeda = (valor: number | string) => {
    return `R$ ${Number(valor).toFixed(2).replace('.', ',')}`;
  };

  const getFornecedorNome = (
    produtos: Produto[],
    fornecedores: Fornecedor[]
  ) => {
    if (!produtos || produtos.length === 0) return 'Fornecedor não encontrado';

    // Encontrar o primeiro produto com Forn_id não nulo
    const produtoComFornecedor = produtos.find((produto) => produto.Forn_id);

    if (!produtoComFornecedor || !produtoComFornecedor.Forn_id) {
      return 'Fornecedor não encontrado';
    }

    // Encontrar o fornecedor pelo Forn_id
    const fornecedor = fornecedores.find(
      (forn) => forn.Forn_id === produtoComFornecedor.Forn_id
    );

    return fornecedor ? fornecedor.Forn_nome : 'Fornecedor não encontrado';
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">Lista de Compras</h2>
      {loading ? (
        <div className="alert alert-info">Carregando compras...</div>
      ) : compras.length === 0 ? (
        <div className="alert alert-warning">Nenhuma compra registrada.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th className="bg-primary text-light">ID</th>
                <th className="bg-primary text-light">Valor Total</th>
                <th className="bg-primary text-light">Data de Criação</th>
                <th className="bg-primary text-light">Fornecedor</th>
                <th className="bg-primary text-light text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {compras.map((compra) => (
                <tr key={compra.Compra_id}>
                  <td>{compra.Compra_id}</td>
                  <td>{formatarMoeda(compra.Compra_total)}</td>
                  <td>
                    {compra.Compra_data
                      ? new Date(compra.Compra_data).toLocaleDateString()
                      : 'Data não disponível'}
                  </td>
                  <td>{compra.fornecedores.length > 0
                      ? compra.fornecedores[0]!.Forn_nome:
                      'Fornecedor não localizado'}</td>
                  <td className="text-center">
                    <button
                      onClick={() => handleEditClick(compra)}
                      className="btn btn-sm btn-warning me-2"
                      title="Editar"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(compra.Compra_id)}
                      className="btn btn-sm btn-danger"
                      title="Excluir"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de Edição */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentCompra && (
            <form>
              <div className="mb-3">
                <label className="form-label">Valor Total</label>
                <input
                  type="number"
                  name="Compra_total"
                  value={currentCompra.Compra_total}
                  onChange={(e) =>
                    setCurrentCompra({ ...currentCompra, Compra_total: Number(e.target.value) })
                  }
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Data de Criação</label>
                <input
                  type="date"
                  name="Compra_data"
                  value={
                    currentCompra.Compra_data
                      ? new Date(currentCompra.Compra_data).toISOString().slice(0, 10)
                      : ''
                  }
                  onChange={(e) =>
                    setCurrentCompra({ ...currentCompra, Compra_data: e.target.value })
                  }
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Fornecedor</label>
                <select
                  className="form-control"
                  name="Forn_id"
                  value={currentCompra.Forn_id ?? ''} // Garante que o valor seja uma string
                  onChange={(e) =>
                    setCurrentCompra({ ...currentCompra, Forn_id: e.target.value })
                  }
                >
                  <option value="">Selecione o fornecedor</option>
                  {fornecedores.map((fornecedor) => (
                    <option key={fornecedor.Forn_id} value={fornecedor.Forn_id}>
                      {fornecedor.Forn_nome}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ComprasList;
