import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { Fornecedor } from '../models/Fornecedor';
import { Compra } from '../models/Compras';
import { ConfigSistema } from '../models/ConfigSistema';
import { Produto } from '../models/Produto';
import { CompraProduto } from '../models/CompraProduto';
import { FornecedorProduto } from '../models/FornecedorProduto';
import { CompraFornecedor } from '../models/CompraFornecedor';

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: 'mysql',
  models: [Compra, Produto, Fornecedor, CompraProduto, FornecedorProduto, CompraFornecedor, ConfigSistema],  // Modelos importados corretamente
});

// Testa a conexão com o banco de dados
const initDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados bem-sucedida!');

    // Sincroniza os modelos com o banco de dados
    await sequelize.sync({ force: false }); // Use { force: true } apenas para reinicializar as tabelas (perderá dados)

    console.log('Tabelas sincronizadas com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
};

initDbConnection();

export default sequelize;
