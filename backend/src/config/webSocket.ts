import WebSocket from 'ws';
import { Server } from 'http';

export const inicializarWebSocket = (server: Server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('Cliente conectado');
    ws.on('message', (message) => {
      console.log('Mensagem recebida: %s', message);
    });
  });

  console.log('WebSocket server iniciado');
};
