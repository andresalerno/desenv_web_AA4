import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Fornecedor } from './Fornecedor';

@Table({ tableName: 'Produtos' })
export class Produto extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  Prod_id: number;

  @Column
  Prod_nome: string;

  @Column
  Prod_marca: string;

  @Column
  Prod_modelo: string;

  @Column
  Prod_preco: number;

  @ForeignKey(() => Fornecedor)
  @Column
  Forn_id: number;

  @BelongsTo(() => Fornecedor, { as: 'fornecedor' })
  fornecedor: Fornecedor;
}
