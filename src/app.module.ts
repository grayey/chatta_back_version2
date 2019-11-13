import { Module } from '@nestjs/common';

import { ClientController } from './client/client.controller';
import { ClientsService } from './client/client.service';
// import { ClientsModule } from './client/client.module';
// import { SettingsModule } from './modules/settings/settings.module';
// import { GraphQLModule } from '@nestjs/graphql';

import config from './config/keys';
import { ClientSchema } from './client/schemas/client.schema';
import { SettingController } from './modules/setting/setting.controller';
import { SettingService } from './modules/setting/setting.service';
import { SettingSchema } from './modules/setting/schemas/setting.schema';


import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './client/client.module';
import { SettingsModule } from './modules/setting/setting.module';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { TreesModule } from './modules/trees/trees.module';
import { MongooseModule } from '@nestjs/mongoose';
import { QueryService } from './services/query/query.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    ClientsModule,
    AuthModule,
    SettingsModule,
    ConversationsModule,
    TreesModule,
      MongooseModule.forFeature([
          { name: 'Client', schema: ClientSchema },
          { name: 'Setting', schema: SettingSchema },
      ]),
    MongooseModule.forRoot(process.env.DB_URL),
  ],

  controllers: [ClientController, SettingController],
  providers: [ClientsService, SettingService, QueryService],
})
export class AppModule {}
