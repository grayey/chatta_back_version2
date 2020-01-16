import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ClientController } from './client/client.controller';
import { ClientsModule } from './client/client.module';
import { ClientsService } from './client/client.service';
import { clientsSchema } from './client/schemas/client.schema';
import { CompaniesController } from './companies/companies.controller';
import { CompaniesModule } from './companies/companies.module';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { SettingSchema } from './modules/setting/schemas/setting.schema';
import { SettingController } from './modules/setting/setting.controller';
import { SettingsModule } from './modules/setting/setting.module';
import { SettingService } from './modules/setting/setting.service';
import { EmailService } from './services/Email/email.service';
import { QueryService } from './services/query/query.service';
import { ResponseService } from './services/ResponseHandler/response-handler.service';
import { treeSchema } from './tree/schemas/tree.schema';
import { TreeModule } from './tree/tree.module';
import { TreeService } from './tree/tree.service';
import { CompaniesService } from './companies/companies.service';
import { CompaniesSchema } from './companies/companies.schema';




@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Client', schema: clientsSchema },
      { name: 'Setting', schema: SettingSchema },
      { name: 'Tree', schema: treeSchema },
      {name: 'Companies', schema: CompaniesSchema}
    ]),
    ClientsModule,
    TreeModule,
    AuthModule,
    SettingsModule,
    ConversationsModule,
    CompaniesModule,
    MongooseModule.forRoot(process.env.DB_URL),
  ],
  controllers: [ClientController, SettingController, CompaniesController],
  providers: [
    ClientsService,
    TreeService,
    SettingService,
    QueryService,
    EmailService,
    ResponseService,
    CompaniesService,
  ],
})
export class AppModule { }