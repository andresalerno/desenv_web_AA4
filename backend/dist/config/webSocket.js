"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inicializarWebSocket = void 0;
const ws_1 = __importDefault(require("ws"));
const inicializarWebSocket = (server) => {
    const wss = new ws_1.default.Server({ server });
    wss.on('connection', (ws) => {
        console.log('Cliente conectado');
        ws.on('message', (message) => {
            console.log('Mensagem recebida: %s', message);
        });
    });
    console.log('WebSocket server iniciado');
};
exports.inicializarWebSocket = inicializarWebSocket;
