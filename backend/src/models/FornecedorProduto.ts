import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Produto } from './Produto';
import { Fornecedor } from './Fornecedor';

@Table({ tableName: 'FornecedorProduto' })
export class FornecedorProduto extends Model {
  @ForeignKey(() => Produto)
  @Column
  Prod_id: number;

  @ForeignKey(() => Fornecedor)
  @Column
  Forn_id: number;
}


// (a) Relacionamento entre Fornecedores e Produtos
// Conceito: Cada fornecedor pode oferecer vários produtos, e cada produto pode ser fornecido por vários fornecedores.
// Solução: Criamos a tabela intermediária FornecedorProduto para gerenciar o relacionamento many-to-many entre Fornecedor e Produto.
// Exemplo:
// Fornecedor 1 fornece Produto A e Produto B.
// Produto A é fornecido por Fornecedor 1 e Fornecedor 2.