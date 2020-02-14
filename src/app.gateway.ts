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
import axios from 'axios';
import { setInterval } from 'timers';
import * as moment from 'moment';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
     getDate = () => {
        const time = new Date();
        return `${time.getMonth() +
          1}/${time.getDate()}/${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
      };
  users = [];
  then = '';
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: object): void {
    const userInfo = payload;
    userInfo['clientId'] = client.id;
    console.log(userInfo);
    this.then = this.getDate();
    this.users.push(userInfo);
    setInterval(() => {
      this.server.emit('msgToClient', this.users);
    }, 5000);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    const now = await this.getDate();
    
    const diff = moment
      .utc(
        moment(now, 'MM/DD/YYY HH:mm:ss').diff(
          moment(this.then, 'MM/DD/YYY HH:mm:ss'),
        ),
      )
      .format('HH:mm:ss');
      console.log(now, diff)
    let userInfo = {};
    this.users.filter((user, index) => {
      if (user.clientId === client.id) {
        userInfo = user;
        return this.users.splice(index, 1);
      }
    });
    if (userInfo['visitor']) {
        console.log(userInfo)
      userInfo['visitor']["session"] = diff;
      userInfo['visitor']["time"] =  this.then
      console.log('USER INFO', userInfo['visitor']);
      axios
        .post('http://localhost:9000/visitors', userInfo['visitor'])
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
