"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database")); // O Sequelize deve ser importado de `database.ts` (ou `sequelize.ts`)
const init_1 = __importDefault(require("./config/init"));
const webSocket_1 = require("./config/webSocket");
const http_1 = __importDefault(require("http"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
// Inicialização do servidor Express
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// Middlewares
app.use((0, cors_1.default)({ origin: 'http://localhost:3000' }));
app.use(express_1.default.json());
app.use(routes_1.default);
// Inicializando WebSocket
(0, webSocket_1.inicializarWebSocket)(server);
// Função de inicialização (configurações iniciais, como bancos)
(0, init_1.default)();
// Conectando ao banco de dados
database_1.default.authenticate()
    .then(() => {
    console.log('Conexão com o banco de dados bem-sucedida!');
    // Sincronizando as tabelas
    database_1.default.sync({ force: false }).then(() => {
        console.log('Tabelas sincronizadas com sucesso!');
        server.listen(5000, () => {
            console.log('Servidor rodando na porta 5000');
        });
    });
})
    .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
});
// Tratamento de erros (opcional)
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Algo deu errado!');
});
