import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
   } from '@nestjs/websockets';
   import { Logger } from '@nestjs/common';
   import { Socket, Server } from 'socket.io';
   import axios from 'axios'
   
   @WebSocketGateway()
   export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
     users = []
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('AppGateway');
   
    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, payload: object): void {
        // axios.post("http://localhost:9000/activeusers",payload).then(res => {
        //     console.log(res)
        // }).catch(error => {
        //     console.log(error.message)
        // })
        // console.log(payload)
        this.users.push(client.id)
     this.server.emit('msgToClient', this.users);
    }
   
    afterInit(server: Server) {
     this.logger.log('Init');
    }
   
    handleDisconnect(client: Socket) {
     this.logger.log(`Client disconnected: ${client.id}`);
     if(this.users.includes(client.id)) {
        this.users.splice(this.users.indexOf(client.id), 1)
        this.server.emit('msgToClient', this.users);
     }
     
    }
   
    handleConnection(client: Socket, ...args: any[]) {
     this.logger.log(`Client connected: ${client.id}`);
    }
   }
   