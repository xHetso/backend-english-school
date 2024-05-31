import { OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class ChatGateway implements OnGatewayConnection {
    server: Server;
    handleConnection(client: Socket): Promise<void>;
    handleMessage(message: {
        senderId: string;
        senderName: string;
        senderSurname: string;
        content: string;
        recipientId: string;
        recipientName: string;
        recipientSurname: string;
    }, client: Socket): Promise<void>;
}
