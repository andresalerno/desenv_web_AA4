"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const Fornecedor_1 = require("../models/Fornecedor");
const Compras_1 = require("../models/Compras");
const ConfigSistema_1 = require("../models/ConfigSistema");
const Produto_1 = require("../models/Produto");
const CompraProduto_1 = require("../models/CompraProduto");
const FornecedorProduto_1 = require("../models/FornecedorProduto");
const CompraFornecedor_1 = require("../models/CompraFornecedor");
dotenv_1.default.config();
const sequelize = new sequelize_typescript_1.Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mysql',
    models: [Compras_1.Compra, Produto_1.Produto, Fornecedor_1.Fornecedor, CompraProduto_1.CompraProduto, FornecedorProduto_1.FornecedorProduto, CompraFornecedor_1.CompraFornecedor, ConfigSistema_1.ConfigSistema], // Modelos importados corretamente
});
// Testa a conexão com o banco de dados
const initDbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log('Conexão com o banco de dados bem-sucedida!');
        // Sincroniza os modelos com o banco de dados
        yield sequelize.sync({ force: false }); // Use { force: true } apenas para reinicializar as tabelas (perderá dados)
        console.log('Tabelas sincronizadas com sucesso!');
    }
    catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
});
initDbConnection();
exports.default = sequelize;
