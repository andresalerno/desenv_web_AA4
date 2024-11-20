import { Table, Column, Model, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import { Produto } from './Produto';
import { Compra } from './Compras';
import { Fornecedor } from './Fornecedor';

@Table({ tableName: 'CompraProduto' })
export class CompraProduto extends Model {
  @ForeignKey(() => Produto)
  @Column
  Prod_id: number;

  @ForeignKey(() => Compra)
  @Column
  Compra_id: number;

  @Column
  Quantidade: number;

  @BelongsTo(() => Produto)
  produto: Produto;

  @BelongsTo(() => Compra)
  compra: Compra;

}


// (b) Relacionamento entre Compras, Produtos e Fornecedores
// Conceito: Uma compra pode incluir:
// Vários produtos.
// Produtos provenientes de múltiplos fornecedores.
// Quantidades específicas de cada produto.
// Solução:
// Tabela CompraProduto: Gerencia o relacionamento entre Compra e Produto, incluindo informações adicionais, como a quantidade de cada produto.
// Tabela CompraFornecedor: Gerencia o relacionamento entre Compra e Fornecedor, garantindo que cada compra pode ser associada a vários fornecedores.
// Exemplo:
// Compra 1 inclui:
// Produto A (Fornecedor 1) – 5 unidades.
// Produto B (Fornecedor 2) – 10 unidades.