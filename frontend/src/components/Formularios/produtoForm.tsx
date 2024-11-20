import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const ProdutoForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Prod_nome: '',
    Prod_preco: 0,
    Prod_custo: 0,
    Prod_marca: '',
    Prod_modelo: '',
    FornecedorId: 0, // Armazena apenas um fornecedor
  });

  const [fornecedores, setFornecedores] = useState<{ value: number; label: string }[]>([]);

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await axios.get('http://localhost:5000/fornecedores');
        if (Array.isArray(response.data)) {
          const fornecedorOptions = response.data.map((fornecedor: any) => ({
            value: fornecedor.Forn_id || 0,
            label: fornecedor.Forn_nome,
          }));
          setFornecedores(fornecedorOptions);
        }
      } catch (error) {
        console.error('Erro ao carregar fornecedores:', error);
      }
    };

    fetchFornecedores();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    });
  };

  const handleFornecedorChange = (selectedOption: any) => {
    setFormData((prevState) => ({
      ...prevState,
      FornecedorId: selectedOption ? selectedOption.value : 0,
    }));
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados enviados:', formData); // Verificar aqui
    try {
      const response = await axios.post('http://localhost:5000/produtos', formData);
      alert('Produto salvo com sucesso!');
      navigate('/produtos');
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      alert('Erro ao salvar produto');
    }
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-4 border border-primary rounded bg-light" style={{ maxWidth: '600px', width: '100%' }}>
        <h2 className="text-center text-primary mb-4">Cadastrar Produto</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="Prod_nome" className="form-label">Nome</label>
            <input
              type="text"
              className="form-control"
              id="Prod_nome"
              name="Prod_nome"
              value={formData.Prod_nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="Prod_preco" className="form-label">Preço</label>
            <input
              type="number"
              className="form-control"
              id="Prod_preco"
              name="Prod_preco"
              value={formData.Prod_preco}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="Prod_custo" className="form-label">Custo</label>
            <input
              type="number"
              className="form-control"
              id="Prod_custo"
              name="Prod_custo"
              value={formData.Prod_custo}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="Prod_marca" className="form-label">Marca</label>
            <input
              type="text"
              className="form-control"
              id="Prod_marca"
              name="Prod_marca"
              value={formData.Prod_marca}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="Prod_modelo" className="form-label">Modelo</label>
            <input
              type="text"
              className="form-control"
              id="Prod_modelo"
              name="Prod_modelo"
              value={formData.Prod_modelo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="FornecedorId" className="form-label">Fornecedor</label>
            <Select
              id="FornecedorId"
              options={fornecedores}
              onChange={handleFornecedorChange} // Atualiza o FornecedorId
              value={fornecedores.find(fornecedor => fornecedor.value === formData.FornecedorId)} // Preenche com o fornecedor selecionado
            />

          </div>
          <button type="submit" className="btn btn-primary w-100">Salvar</button>
        </form>
      </div>
    </div>
  );
};

export default ProdutoForm;
