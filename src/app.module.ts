import { Module } from '@nestjs/common';
import { ClientController } from './client/client.controller';
import { ClientService } from './client/client.service';
// import { ClientsModule } from './client/client.module';
// import { SettingsModule } from './modules/settings/settings.module';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { TreesModule } from './modules/trees/trees.module';
import { MongooseModule } from '@nestjs/mongoose';
// import { GraphQLModule } from '@nestjs/graphql';
import { QueryService } from './services/query/query.service';
import config from './config/keys';
import { ClientSchema } from './client/schemas/client.schema';
import { SettingController } from './modules/setting/setting.controller';
import { SettingService } from './modules/setting/setting.service';
import { SettingSchema } from './modules/setting/schemas/setting.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Client', schema: ClientSchema },
      { name: 'Setting', schema: SettingSchema },
    ]),
    // ClientsModule,
    // SettingsModule,
    ConversationsModule,
    TreesModule,
    // MongooseModule.forRoot(config.mongoURI),
    MongooseModule.forRoot('mongodb://localhost/chatbot'),
    // GraphQLModule.forRoot({
    //     installSubscriptionHandlers: true,
    //     autoSchemaFile: 'schema.gql',
    // })
  ],

  controllers: [ClientController, SettingController],
  providers: [ClientService, SettingService, QueryService],
})
export class AppModule {}
