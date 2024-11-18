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
