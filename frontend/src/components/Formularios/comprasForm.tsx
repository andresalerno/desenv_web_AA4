import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ComprasForm: React.FC = () => {
  const navigate = useNavigate();
  const [produtosDisponiveis, setProdutosDisponiveis] = useState<any[]>([]); // Lista de produtos disponíveis
  const [compraProdutos, setCompraProdutos] = useState<{ Prod_id: number; Quantidade: number }[]>([]); // Produtos selecionados para a compra
  const [formData, setFormData] = useState({
    Compra_data: '',
  });

  // Buscar produtos disponíveis
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/produtos'); // API que retorna produtos
        setProdutosDisponiveis(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
    fetchProdutos();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleProdutoChange = (index: number, field: string, value: string | number) => {
    const updatedCompraProdutos = [...compraProdutos];
    updatedCompraProdutos[index] = {
      ...updatedCompraProdutos[index],
      [field]: field === 'Quantidade' ? Number(value) : value,
    };
    setCompraProdutos(updatedCompraProdutos);
  };

  const handleAddProduto = () => {
    setCompraProdutos([...compraProdutos, { Prod_id: 0, Quantidade: 1 }]); // Adiciona um novo produto com valores padrão
  };

  const handleRemoveProduto = (index: number) => {
    setCompraProdutos(compraProdutos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        produtos: compraProdutos,
      };

      await axios.post('http://localhost:5000/compras', data);
      alert('Compra registrada com sucesso!');
      navigate('/compras');
      setFormData({ Compra_data: '' });
      setCompraProdutos([]);
    } catch (error) {
      console.error('Erro ao registrar compra:', error);
      alert('Erro ao registrar compra');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-4 border border-primary rounded bg-light" style={{ maxWidth: '800px', width: '100%' }}>
        <h2 className="text-center text-primary mb-4">Registrar Compra</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="Compra_data" className="form-label">Data da Compra</label>
            <input
              type="date"
              className="form-control"
              id="Compra_data"
              name="Compra_data"
              value={formData.Compra_data}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <h4>Produtos</h4>
            {compraProdutos.map((produto, index) => (
              <div key={index} className="d-flex align-items-center mb-3">
                <select
                  className="form-control me-2"
                  value={produto.Prod_id}
                  onChange={(e) => handleProdutoChange(index, 'Prod_id', Number(e.target.value))}
                  required
                >
                  <option value={0}>Selecione um produto</option>
                  {produtosDisponiveis.map((p) => (
                    <option key={p.Prod_id} value={p.Prod_id}>
                      {p.Prod_nome} {/* Exibe o nome do produto */}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  className="form-control me-2"
                  value={produto.Quantidade}
                  min={1}
                  onChange={(e) => handleProdutoChange(index, 'Quantidade', e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveProduto(index)}
                >
                  Remover
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-secondary w-100" onClick={handleAddProduto}>
              Adicionar Produto
            </button>
          </div>
          <button type="submit" className="btn btn-primary w-100">Registrar Compra</button>
        </form>
      </div>
    </div>
  );
};

export default ComprasForm;
