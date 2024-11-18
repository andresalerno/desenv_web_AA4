import express from 'express';
import sequelize from './config/database';  // O Sequelize deve ser importado de `database.ts` (ou `sequelize.ts`)
import init from './config/init';
import { inicializarWebSocket } from './config/webSocket';
import http from 'http';
import router from './routes';
import cors from 'cors';

// Inicialização do servidor Express
const app = express();
const server = http.createServer(app);

// Middlewares
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(router);


// Inicializando WebSocket
inicializarWebSocket(server);

// Função de inicialização (configurações iniciais, como bancos)
init();

// Conectando ao banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados bem-sucedida!');
    // Sincronizando as tabelas
    sequelize.sync({ force: false }).then(() => {
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
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).send('Algo deu errado!');
});
