import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FornecedorForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Forn_nome: '',
    Forn_razaoSocial: '',
    Forn_cnpj: '',
    Forn_status: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    // Validação do nome
    if (!formData.Forn_nome) {
      newErrors.Forn_nome = 'Nome é obrigatório';
    }

    // Validação da razão social
    if (!formData.Forn_razaoSocial) {
      newErrors.Forn_razaoSocial = 'Razão Social é obrigatória';
    }

    // Validação do CNPJ (Formato simples)
    if (!formData.Forn_cnpj) {
      newErrors.Forn_cnpj = 'CNPJ é obrigatório';
    } else if (!/^\d{14}$/.test(formData.Forn_cnpj)) {
      newErrors.Forn_cnpj = 'CNPJ inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await axios.post('http://localhost:5000/fornecedores', formData);
      alert('Fornecedor salvo com sucesso!');
      navigate('/fornecedores');
      setFormData({
        Forn_nome: '',
        Forn_razaoSocial: '',
        Forn_cnpj: '',
        Forn_status: false,
      });
    } catch (error) {
      console.error('Erro ao salvar fornecedor:', error);
      alert('Erro ao salvar fornecedor');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-4 border border-primary rounded bg-light" style={{ maxWidth: '600px', width: '100%' }}>
        <h2 className="text-center text-primary mb-4">Cadastro de Fornecedor</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="Forn_nome" className="form-label">Nome</label>
            <input
              type="text"
              className="form-control"
              id="Forn_nome"
              name="Forn_nome"
              value={formData.Forn_nome}
              onChange={handleChange}
              required
            />
            {errors.Forn_nome && <div className="text-danger">{errors.Forn_nome}</div>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="Forn_razaoSocial" className="form-label">Razão Social</label>
            <input
              type="text"
              className="form-control"
              id="Forn_razaoSocial"
              name="Forn_razaoSocial"
              value={formData.Forn_razaoSocial}
              onChange={handleChange}
              required
            />
            {errors.Forn_razaoSocial && <div className="text-danger">{errors.Forn_razaoSocial}</div>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="Forn_cnpj" className="form-label">CNPJ</label>
            <input
              type="text"
              className="form-control"
              id="Forn_cnpj"
              name="Forn_cnpj"
              value={formData.Forn_cnpj}
              onChange={handleChange}
              required
            />
            {errors.Forn_cnpj && <div className="text-danger">{errors.Forn_cnpj}</div>}
          </div>
          <div className="form-group form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="Forn_status"
              name="Forn_status"
              checked={formData.Forn_status}
              onChange={handleChange}
            />
            <label htmlFor="Forn_status" className="form-check-label">Ativo</label>
          </div>
          <button type="submit" className="btn btn-primary w-100">Salvar</button>
        </form>
      </div>
    </div>
  );
};

export default FornecedorForm;
