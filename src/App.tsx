// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FornecedorList from './components/Formularios/fornecedorList';
import FornecedorForm from './components/Formularios/fornecedorForm';
import ProdutoForm from './components/Formularios/produtoForm';
import ProdutoList from './components/Formularios/produtoList';
import ComprasList from './components/Formularios/comprasList';
import CompraForm from './components/Formularios/comprasForm';

const App: React.FC = () => (
  <Router>
    <div className="container">
      {/* <h1>Gestão de Fornecedores</h1> */}
      <Routes>
        <Route path="/fornecedores" element={<FornecedorList />} />
        <Route path="/produtos" element={<ProdutoList />} />
        <Route path="/compras" element={<ComprasList />} />
        <Route path="/fornecedores-cadastrar" element={<FornecedorForm />} />
        <Route path="/produtos-cadastrar" element={<ProdutoForm />} />
        <Route path="/compras-cadastrar" element={<CompraForm />} />
      </Routes>
    </div>
  </Router>
);

export default App;
