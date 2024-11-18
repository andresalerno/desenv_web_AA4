import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { Produto } from './Produto';
import { CompraProduto } from './Compra_produto';

@Table({ tableName: 'Compras' })
export class Compra extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  Compra_id: number;

  @Column
  Compra_data: Date;

  @Column
  Compra_total: number;

  // Relacionamento muitos-para-muitos com Produto através da tabela intermediária CompraProduto
  @BelongsToMany(() => Produto, () => CompraProduto)
  produtos: Produto[];

  @HasMany(() => CompraProduto)
  produtoCompra: CompraProduto[];
}
