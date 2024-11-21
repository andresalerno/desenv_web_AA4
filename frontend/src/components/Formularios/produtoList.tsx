import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface Fornecedor {
  FornecedorId: number;
  Forn_nome: string;
}

interface Produto {
  Prod_id: number;
  Prod_nome: string;
  Prod_preco: number;
  Prod_custo: number;
  Prod_marca: string;
  Prod_modelo: string;
  Prod_status: boolean;
  FornecedorId: [{Forn_id: number, Forn_nome: string}];
}

const ProdutoList: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [currentProduto, setCurrentProduto] = useState<Produto | null>(null);
  const [currentFornecedor, setCurrentFornecedor] = useState<Fornecedor | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const produtosResponse = await fetch('http://localhost:5000/produtos');
        const fornecedoresResponse = await fetch('http://localhost:5000/fornecedores');
        
        if (!produtosResponse.ok || !fornecedoresResponse.ok) {
          throw new Error('Erro ao buscar dados do servidor.');
        }

        const produtosData = await produtosResponse.json();
        const fornecedoresData = await fornecedoresResponse.json();
        
        setProdutos(produtosData);
        setFornecedores(fornecedoresData);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEditClick = (produto: Produto) => {
    setCurrentProduto(produto);
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    if (currentProduto) {
      try {
        const fornecedoresIds = currentProduto.FornecedorId.map((f) => FornecedorId);
  
        const updatedProduto = {
          ...currentProduto,
          fornecedores: fornecedoresIds, // Envie apenas os IDs para o backend
        };
  
        // Atualize o produto no backend
        await axios.put(`http://localhost:5000/produtos/${currentProduto.Prod_id}`, updatedProduto);
  
        // Atualize o estado local dos produtos
        setProdutos((prev) =>
          prev.map((prod) =>
            prod.Prod_id === currentProduto.Prod_id
              ? {
                  ...prod,
                  ...currentProduto,
                  fornecedores: currentProduto.FornecedorId, // Retorne os fornecedores no formato original
                }
              : prod
          )
        );
  
        alert("Produto atualizado com sucesso!");
        setShowEditModal(false);
      } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        alert("Erro ao atualizar produto");
      }
    }
  };
  
  
  

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/produtos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir produto');
      }

      setProdutos(produtos.filter((produto) => produto.Prod_id !== id));
      alert('Produto excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      alert('Erro ao excluir produto');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">Lista de Produtos</h2>
      {loading ? (
        <div className="alert alert-info">Carregando produtos...</div>
      ) : produtos.length === 0 ? (
        <div className="alert alert-warning">Nenhum produto encontrado.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th className="bg-primary text-light">ID</th>
                <th className="bg-primary text-light">Nome</th>
                <th className="bg-primary text-light">Preço</th>
                <th className="bg-primary text-light">Custo</th>
                <th className="bg-primary text-light">Marca</th>
                <th className="bg-primary text-light">Modelo</th>
                <th className="bg-primary text-light">Status</th>
                <th className="bg-primary text-light">Fornecedor</th>
                <th className="bg-primary text-light text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <tr key={produto.Prod_id}>
                  <td>{produto.Prod_id}</td>
                  <td>{produto.Prod_nome}</td>
                  <td>{produto.Prod_preco}</td>
                  <td>{produto.Prod_custo}</td>
                  <td>{produto.Prod_marca}</td>
                  <td>{produto.Prod_modelo}</td>
                  <td>{produto.Prod_status ? 'Ativo' : 'Inativo'}</td>
                  <td>{produto.fornecedores?.[0]?.Forn_nome || "Sem fornecedor"}</td>
                  <td className="text-center">
                    <button
                      onClick={() => handleEditClick(produto)}
                      className="btn btn-sm btn-warning me-2"
                      title="Editar"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(produto.Prod_id)}
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
        <Modal.Title>Editar Produto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {currentProduto && (
          <form>
            <div className="mb-3">
              <label className="form-label">Nome</label>
              <input
                type="text"
                name="Prod_nome"
                value={currentProduto.Prod_nome}
                onChange={(e) => setCurrentProduto({ ...currentProduto, Prod_nome: e.target.value })}
                className="form-control"
              />
            </div>
            {/* Outros campos para informações do produto */}
            <div className="mb-3">
            <label className="form-label">Fornecedor</label>
            <select
              className="form-control"
              value={
                currentProduto.fornecedores && currentProduto.fornecedores.length > 0
                  ? currentProduto.fornecedores[0].id // Use o ID
                  : ""
              }
              onChange={(e) => {
                const selectedFornecedor = fornecedores.find(
                  (fornecedor) => FornecedorId.Forn_id === parseInt(e.target.value)
                );
                if (selectedFornecedor) {
                  setCurrentProduto({
                    ...currentProduto,
                    FornecedorId: [
                      { Forn_id: selectedFornecedor.Forn_id, Forn_nome: selectedFornecedor.Forn_nome },
                    ],
                  });
                }
              }}
            >
              <option value="" disabled>Selecione um fornecedor</option>
              {fornecedores.map((FornecedorId) => (
                <option key={FornecedorId.Forn_id} value={FornecedorId.Forn_id}>
                  {FornecedorId.Forn_nome}
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
          Atualizar
        </Button>
      </Modal.Footer>
    </Modal>

    </div>
  );
};

export default ProdutoList;
