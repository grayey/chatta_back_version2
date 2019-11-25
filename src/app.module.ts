import { Module } from '@nestjs/common';

// import { ClientController } from './client/client.controller';
// import { ClientsService } from './client/client.service';
// import { ClientsModule } from './client/client.module';
// import { SettingsModule } from './modules/settings/settings.module';
// import { GraphQLModule } from '@nestjs/graphql';

import config from './config/keys';
// import { ClientSchema } from './client/schemas/client.schema';
// import { SettingController } from './modules/setting/setting.controller';
// import { SettingService } from './modules/setting/setting.service';
// import { SettingSchema } from './modules/setting/schemas/setting.schema';

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
import { SettingController } from './modules/setting/setting.controller';
import { SettingService } from './modules/setting/setting.service';
import { SettingSchema } from './modules/setting/schemas/setting.schema';
import { ClientController } from './client/client.controller';
import { ClientsService } from './client/client.service';
import { clientsSchema } from './client/schemas/client.schema';
import { EmailService } from './services/Email/email.service';
import { ResponseService } from './services/ResponseHandler/response-handler.service';

import { CompaniesModule } from './companies/companies.module';

import { CompaniesController } from './companies/companies.controller';
import { CompaniesService } from './companies/companies.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Client', schema: clientsSchema },
      { name: 'Setting', schema: SettingSchema },
    ]),
    ClientsModule,
    AuthModule,
    SettingsModule,
    ConversationsModule,
    TreesModule,
    CompaniesModule,
    MongooseModule.forRoot(process.env.DB_URL),
  ],
  controllers: [ClientController, SettingController, CompaniesController],
  providers: [
    ClientsService,
    SettingService,
    QueryService,
    EmailService,
    ResponseService,
  ],
})
export class AppModule {}
