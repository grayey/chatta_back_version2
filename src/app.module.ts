import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './modules/clients/clients.module';
import { SettingsModule } from './modules/settings/settings.module';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { TreesModule } from './modules/trees/trees.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { QueryService } from './services/query/query.service';

@Module({
  imports: [
      ClientsModule,
      SettingsModule,
      ConversationsModule,
      TreesModule,
      MongooseModule.forRoot('mongodb://localhost/chatbot'),
      // GraphQLModule.forRoot({
      //     installSubscriptionHandlers: true,
      //     autoSchemaFile: 'schema.gql',
      // })
  ],

  controllers: [AppController],
  providers: [AppService, QueryService],
})
export class AppModule {}
