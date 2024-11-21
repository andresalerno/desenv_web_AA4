import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ComprasForm: React.FC = () => {
  const navigate = useNavigate();
  const [produtosDisponiveis, setProdutosDisponiveis] = useState<any[]>([]);
  const [fornecedoresDisponiveis, setFornecedoresDisponiveis] = useState<any[]>([]);

  const [compraProdutos, setCompraProdutos] = useState<{ Prod_id: number; Quantidade: number }[]>([]);
  const [formData, setFormData] = useState({
    Compra_data: '',
    FornecedorId: '',
  });

  // Buscar produtos e fornecedores ao carregar o componente
  useEffect(() => {
    const fetchProdutosEFornecedores = async () => {
      try {
        const produtosResponse = await fetch('http://localhost:5000/produtos');
        const fornecedoresResponse = await fetch('http://localhost:5000/fornecedores');
        
        if (!produtosResponse.ok || !fornecedoresResponse.ok) {
          throw new Error('Erro ao buscar dados');
        }

        const produtosData = await produtosResponse.json();
        const fornecedoresData = await fornecedoresResponse.json();

        console.log('Produtos:', produtosData);
        console.log('Fornecedores:', fornecedoresData);

        setProdutosDisponiveis(produtosData);
        setFornecedoresDisponiveis(fornecedoresData);
      } catch (error) {
        console.error('Erro ao buscar produtos ou fornecedores:', error);
      }
    };

    fetchProdutosEFornecedores();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'FornecedorId' ? Number(value) : value
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
    setCompraProdutos([...compraProdutos, { Prod_id: 0, Quantidade: 1 }]);
  };

  const handleRemoveProduto = (index: number) => {
    setCompraProdutos(compraProdutos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Calcular o valor total da compra
    const Compra_total = compraProdutos.reduce((total, p) => {
      const produto = produtosDisponiveis.find(prod => prod.Prod_id === p.Prod_id);
      return produto ? total + produto.Prod_preco! * p.Quantidade : total;
    }, 0);
  
    // Criar o objeto de dados para enviar
    const data = {
      Compra_data: new Date(formData.Compra_data).toISOString(),  // Data no formato ISO
      Compra_total, // Total da compra
      produtos: compraProdutos.map(p => ({
        Prod_id: p.Prod_id,
        Quantidade: p.Quantidade,
      })),
      fornecedores: [formData.FornecedorId],
    };
  
    console.log('Dados que serão enviados:', data);
  
    try {
      const response = await fetch('http://localhost:5000/compras', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data), // Enviar os dados para o backend
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro desconhecido');
      }
  
      alert('Compra registrada com sucesso!');
      navigate('/compras');
      setFormData({ Compra_data: '', FornecedorId: '' });
      setCompraProdutos([]);
    } catch (error: any) {
      console.error('Erro ao registrar compra:', error);
      alert(`Erro: ${error.message}`);
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
            <label htmlFor="FornecedorId" className="form-label">Fornecedor</label>
            <select
              className="form-control"
              id="FornecedorId"
              name="FornecedorId"
              value={formData.FornecedorId}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um fornecedor</option>
              {fornecedoresDisponiveis.length > 0 ? (
                fornecedoresDisponiveis.map((fornecedor) => (
                  <option key={fornecedor.Forn_id} value={fornecedor.Forn_id}>
                    {fornecedor.Forn_nome}
                  </option>
                ))
              ) : (
                <option>Sem fornecedores cadastrados</option>
              )}
            </select>
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
                      {p.Prod_nome}
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
            <button type="button" className="btn btn-secondary" onClick={handleAddProduto}>
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
