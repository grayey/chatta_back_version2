import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger, Req, Res } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import axios from 'axios';
import { setInterval } from 'timers';
import * as moment from 'moment';
import { VisitorsService } from './visitors/visitors.service';
import {
  TextAnalyticsClient,
  TextAnalyticsApiKeyCredential,
} from '@azure/ai-text-analytics';
const key = '2b4c830b2d9447089631867bc98f837d';
const endpoint = `https://mychatta.cognitiveservices.azure.com/`;

const textAnalyticsClient = new TextAnalyticsClient(
  endpoint,
  new TextAnalyticsApiKeyCredential(key),
);
async function keyPhraseExtraction(client, keyPhrasesInput) {
  const keywords = [];

  const sentiments = [];
  try {
    const keyPhraseResult = await client.extractKeyPhrases(keyPhrasesInput);
    const sentimentResult = await client.analyzeSentiment(keyPhrasesInput);
    keyPhraseResult.forEach(document => {
      keywords.push({
        Id: document.id,
        phrases: document.keyPhrases,
      });
    });

    //sentiment

    sentimentResult.forEach(document => {
      sentiments.push({
        id: document.id,
        documentSentiment: document.sentiment,
        positive: document.confidenceScores.positive.toFixed(2),
        negative: document.confidenceScores.negative.toFixed(2),
        neutral: document.confidenceScores.neutral.toFixed(2),
        sentences: document.sentences.length,
      });
    });
    console.log('phrases', keyPhrasesInput, sentiments);
    return {
      keywords,
      sentiments,
    };
  } catch (error) {
    console.log('errorss', error);
  }
}
// const analyze = async () => {
//     console.log(await keyPhraseExtraction(textAnalyticsClient,"ff"))

// }
// analyze()
@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly visitorService: VisitorsService) {}
  getDate = (date = null) => {
    const time = new Date();
    return date
      ? `${time.getMonth() + 1}/${time.getDate()}/${time.getFullYear()}`
      : `${time.getMonth() +
          1}/${time.getDate()}/${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
  };
  users = [];
  then = '';
  botId = '';
  lead = {};
  conversations = [];
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: object): void {
    console.log('message to server');
    const userInfo = payload;
    console.log(userInfo);
    userInfo['clientId'] = client.id;
    this.botId = payload['botId'];
    this.lead = payload['lead'];
    this.conversations = payload['conversations'];
    this.then = this.getDate();
    this.users.push(userInfo);
    setInterval(() => {
      this.server.emit('msgToClient', this.users);
    }, 5000);
  }
  @SubscribeMessage('updateConversation')
  updateConversation(client: Socket, payload: any): void {
    this.conversations = payload;
  }
  @SubscribeMessage('updateLeads')
  updateLeads(client: Socket, payload: any): void {
    this.lead = payload;
    console.log('LEADS', payload);
  }
  afterInit(server: Server) {
    this.logger.log('Init');
  }
  getUserConversations = conversations => {
    const convo = [];
    conversations.forEach(conversation => {
      if (conversation.from === 'user') convo.push(conversation.message);
    });
    return convo.slice(2, convo.length - 1);
  };
  async handleDisconnect(client: Socket) {
    const created = this.getDate(true);
    const userConversations = await this.getUserConversations(
      this.conversations,
    );
    if (userConversations.length) {
      const keywordAnalytics = await keyPhraseExtraction(
        textAnalyticsClient,
        userConversations,
      );

      console.log('keyword', keywordAnalytics);
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
        userInfo['visitor']['session'] = diff;
        userInfo['visitor']['lead'] = this.lead;
        userInfo['visitor']['conversations'] = this.conversations;
        if (keywordAnalytics) {
          userInfo['visitor']['keywordAnalytics'] = keywordAnalytics;
        }

        axios
          .post('http://localhost:9000/visitors', {
            visitors: userInfo['visitor'],
            botId: this.botId,
            created,
          })
          .then(res => {
            console.log('response', res.data.data);
          })
          .catch(error => {
            console.log(error.message);
          });
      }
    }
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
