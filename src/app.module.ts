import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './client/client.module';
import { SettingsModule } from './modules/settings/settings.module';
import { ConversationsModule } from './modules/conversations/conversations.module';
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
import { TreeModule } from './tree/tree.module';
import { TreeService } from './tree/tree.service';
import { treeSchema } from './tree/schemas/tree.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Client', schema: clientsSchema },
      { name: 'Setting', schema: SettingSchema },
      { name: 'Tree', schema: treeSchema },
    ]),
    ClientsModule,
    TreeModule,
    AuthModule,
    SettingsModule,
    ConversationsModule,
    MongooseModule.forRoot(process.env.DB_URL),
  ],

  controllers: [ClientController, SettingController],
  providers: [
    ClientsService,
    TreeService,
    SettingService,
    QueryService,
    EmailService,
    ResponseService,
  ],
})
export class AppModule {}
