import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './client/client.module';
import { SettingsModule } from './modules/settings/settings.module';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { MongooseModule } from '@nestjs/mongoose';
import { QueryService } from './services/query/query.service';
import { AuthModule } from './auth/auth.module';
import { TreeController } from './tree/tree.controller';
import { TreeModule } from './tree/tree.module';

@Module({
  imports: [
    ClientsModule,
    AuthModule,
    SettingsModule,
    ConversationsModule,
    MongooseModule.forRoot(process.env.DB_URL),
    TreeModule,
  ],

  controllers: [AppController, TreeController],
  providers: [AppService, QueryService],
})
export class AppModule {}
