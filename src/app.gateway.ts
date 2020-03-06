import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { ConfigService
 } from '@nestjs/config';

import {
  Controller,
  Post,
  Put,
  Delete,
  Param,
  Patch,
  Get,
  Body,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import axios from 'axios';
import { setInterval } from 'timers';
import * as moment from 'moment';
import {VisitorsService} from './visitors/visitors.service'

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly configService: ConfigService, private visitorsService: VisitorsService) {}
     getDate = () => {
        const time = new Date();
        return `${time.getMonth() +
          1}/${time.getDate()}/${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
      };
  users = [];
  then = '';
  botId = ""
  lead = {}
  conversations = []
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: object): void {
    const dbUser = this.configService.get<string>('port');
    console.log("message to server", dbUser)

    const userInfo = payload;
    console.log(userInfo)
    userInfo['clientId'] = client.id;
    this.botId= payload["botId"]
    this.lead = payload["lead"]
    this.conversations = payload["conversations"]
    this.then = this.getDate();
    this.users.push(userInfo);
    setInterval(() => {
      this.server.emit('msgToClient', this.users);
    }, 5000);
  }
@SubscribeMessage("updateConversation")
updateConversation(client: Socket, payload: any) :void {
this.conversations = payload
}
@SubscribeMessage("updateLeads")
updateLeads(client: Socket, payload: any) :void {
this.lead = payload
console.log("LEADS", payload)
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
    let userInfo = {};
    this.users.filter((user, index) => {
      if (user.clientId === client.id) {
        userInfo = user;
        return this.users.splice(index, 1);
      }
    });
    if (userInfo['visitor']) {
      userInfo['visitor']["session"] = diff;
      userInfo['visitor']['lead'] = this.lead
      userInfo['visitor']['conversations'] = this.conversations
      const payload = { visitors:userInfo['visitor'], botId: this.botId}
       this.visitorsService.createVisitors(payload,Res,Req)
      // axios
      //   .post('http://localhost:9000/visitors',payload)
      //   .then(res => {
      //     console.log("response",res.data.data.visitors.conversations);
      //   })
      //   .catch(error => {
      //     console.log(error.message);
      //   });
    }
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
