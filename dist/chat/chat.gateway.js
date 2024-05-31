"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const promises_1 = require("fs/promises");
let ChatGateway = class ChatGateway {
    async handleConnection(client) {
        try {
            const chatHistory = await (0, promises_1.readFile)('chatMessages.json', 'utf8');
            client.emit('chatHistory', chatHistory);
        }
        catch (error) {
            console.error('Ошибка при чтении файла:', error);
        }
    }
    async handleMessage(message, client) {
        const now = new Date();
        const formattedDate = now.toLocaleDateString('ru-RU', { timeZone: 'Asia/Almaty' });
        const formattedTime = now.toLocaleTimeString('ru-RU', { timeZone: 'Asia/Almaty', hour: '2-digit', minute: '2-digit' });
        const formattedMessage = {
            date: formattedDate,
            time: formattedTime,
            content: message.content,
            sender: {
                userId: message.senderId,
                name: message.senderName,
                surname: message.senderSurname,
            },
            recipient: {
                id: message.recipientId,
                name: message.recipientName,
                surname: message.recipientSurname
            },
        };
        try {
            let chatHistory = [];
            try {
                const fileContent = await (0, promises_1.readFile)('chatMessages.json', 'utf8');
                chatHistory = JSON.parse(fileContent);
            }
            catch (readError) {
                if (readError.code !== 'ENOENT') {
                    throw readError;
                }
            }
            chatHistory.push(formattedMessage);
            await (0, promises_1.writeFile)('chatMessages.json', JSON.stringify(chatHistory, null, 2));
            this.server.emit('chatToClient', formattedMessage);
        }
        catch (error) {
            console.error('Ошибка при записи файла:', error);
        }
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('chatToServer'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMessage", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ namespace: '/api/chat', cors: true })
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map