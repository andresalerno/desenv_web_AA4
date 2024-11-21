import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Produto } from './Produto';
import { Compra } from './Compras';

@Table({ tableName: 'CompraProduto' })
export class CompraProduto extends Model {
  @ForeignKey(() => Produto)
  @Column
  Prod_id!: number;

  @ForeignKey(() => Compra)
  @Column
  Compra_id!: number;

  @Column
  Quantidade!: number;

  @BelongsTo(() => Produto)
  produto!: Produto;

  @BelongsTo(() => Compra)
  compra!: Compra;
}
