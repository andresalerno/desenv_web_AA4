import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Compra } from './Compras';
import { Fornecedor } from './Fornecedor';

@Table({ tableName: 'CompraFornecedor' })
export class CompraFornecedor extends Model {
  @ForeignKey(() => Compra)
  @Column
  Compra_id: number;

  @ForeignKey(() => Fornecedor)
  @Column
  Forn_id: number;

  @BelongsTo(() => Compra)
  compra: Compra;

  @BelongsTo(() => Fornecedor)
  fornecedor: Fornecedor;
}
