import { Table, Column, Model, PrimaryKey, AutoIncrement, HasMany, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import { CompraProduto } from './Compra_produto';
import { Fornecedor } from './Fornecedor';
import { FornecedorProduto } from './FornecedorProduto';

@Table({ tableName: 'Produtos' })
export class Produto extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  Prod_id: number;

  @Column
  Prod_nome: string;

  @Column
  Prod_preco: number;

  @Column
  Prod_custo: number;

  @Column
  Prod_marca: string;

  @Column
  Prod_modelo: string;

  @BelongsToMany(() => Fornecedor, () => FornecedorProduto)
  fornecedores: Fornecedor[];

}
