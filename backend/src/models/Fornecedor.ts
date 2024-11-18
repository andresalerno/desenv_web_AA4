import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Produto } from './Produto';
import { FornecedorProduto } from './FornecedorProduto';

@Table({ tableName: 'Fornecedores' })
export class Fornecedor extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  Forn_id: number;

  @Column
  Forn_nome: string;

  @Column
  Forn_razaoSocial: string;

  @Column
  Forn_cnpj: string;

  @Column
  Forn_status: string;

  @BelongsToMany(() => Produto, () => FornecedorProduto)
  produtos: Produto[];
}
