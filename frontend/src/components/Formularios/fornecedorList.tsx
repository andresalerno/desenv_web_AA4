import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

interface Fornecedor {
  Forn_id: number;
  Forn_nome: string;
  Forn_razaoSocial: string;
  Forn_cnpj: string;
  Forn_status: boolean;
}

const FornecedorList: React.FC = () => {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentFornecedor, setCurrentFornecedor] = useState<Fornecedor | null>(null);

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await axios.get<Fornecedor[]>('http://localhost:5000/fornecedores');
        setFornecedores(response.data);
      } catch (error) {
        console.error('Erro ao buscar fornecedores:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFornecedores();
  }, []);

  const handleEditClick = (fornecedor: Fornecedor) => {
    setCurrentFornecedor(fornecedor);
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    if (currentFornecedor) {
      try {
        await axios.put(`http://localhost:5000/fornecedores/${currentFornecedor.Forn_id}`, currentFornecedor);
        setFornecedores((prev) =>
          prev.map((forn) =>
            forn.Forn_id === currentFornecedor.Forn_id ? currentFornecedor : forn
          )
        );
        alert('Fornecedor atualizado com sucesso!');
        setShowEditModal(false);
      } catch (error) {
        console.error('Erro ao atualizar fornecedor:', error);
        alert('Erro ao atualizar fornecedor');
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/fornecedores/${id}`);
      setFornecedores(fornecedores.filter((fornecedor) => fornecedor.Forn_id !== id));
      alert('Fornecedor excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir fornecedor:', error);
      alert('Erro ao excluir fornecedor');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">Lista de Fornecedores</h2>
      {fornecedores.length === 0 ? (
        <div className="alert alert-warning">Nenhum fornecedor encontrado.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th className="bg-primary text-light">ID</th>
                <th className="bg-primary text-light">Nome</th>
                <th className="bg-primary text-light">Razão Social</th>
                <th className="bg-primary text-light">CNPJ</th>
                <th className="bg-primary text-light">Status</th>
                <th className="bg-primary text-light text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {fornecedores.map((fornecedor) => (
                <tr key={fornecedor.Forn_id}>
                  <td>{fornecedor.Forn_id}</td>
                  <td>{fornecedor.Forn_nome}</td>
                  <td>{fornecedor.Forn_razaoSocial}</td>
                  <td>{fornecedor.Forn_cnpj}</td>
                  <td>{fornecedor.Forn_status ? 'Ativo' : 'Inativo'}</td>
                  <td className="text-center">
                    <button
                      onClick={() => handleEditClick(fornecedor)}
                      className="btn btn-sm btn-warning me-2"
                      title="Editar"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(fornecedor.Forn_id)}
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
          <Modal.Title>Editar Fornecedor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentFornecedor ? (
            <form>
              <div className="mb-3">
                <label className="form-label">Nome</label>
                <input
                  type="text"
                  name="Forn_nome"
                  value={currentFornecedor.Forn_nome}
                  onChange={(e) => setCurrentFornecedor({ ...currentFornecedor, Forn_nome: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Razão Social</label>
                <input
                  type="text"
                  name="Forn_razaoSocial"
                  value={currentFornecedor.Forn_razaoSocial}
                  onChange={(e) => setCurrentFornecedor({ ...currentFornecedor, Forn_razaoSocial: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">CNPJ</label>
                <input
                  type="text"
                  name="Forn_cnpj"
                  value={currentFornecedor.Forn_cnpj}
                  onChange={(e) => setCurrentFornecedor({ ...currentFornecedor, Forn_cnpj: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  name="Forn_status"
                  checked={currentFornecedor.Forn_status}
                  onChange={(e) => setCurrentFornecedor({ ...currentFornecedor, Forn_status: e.target.checked })}
                  className="form-check-input"
                />
                <label className="form-check-label">Ativo</label>
              </div>
            </form>
          ) : (
            <p>Carregando fornecedor...</p> // Mensagem enquanto o fornecedor não é carregado
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

export default FornecedorList;
