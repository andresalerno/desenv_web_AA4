import { Table, Column, Model, PrimaryKey, AutoIncrement, BelongsToMany } from 'sequelize-typescript';
import { Produto } from './Produto';
import { CompraProduto } from './CompraProduto';
import { Fornecedor } from './Fornecedor';
import { CompraFornecedor } from './CompraFornecedor';

@Table({ tableName: 'Compras' })
export class Compra extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  Compra_id!: number;

  @Column
  Compra_data!: Date;

  @Column
  Compra_total!: number;

  @BelongsToMany(() => Produto, () => CompraProduto)
  produtos!: Produto[];

  @BelongsToMany(() => Fornecedor, () => CompraFornecedor)
  fornecedores!: Fornecedor[];
}
