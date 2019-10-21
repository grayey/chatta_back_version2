import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './client/client.module';
import { SettingsModule } from './modules/settings/settings.module';
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
    MongooseModule.forRoot(process.env.DB_URL),
  ],

  controllers: [AppController],
  providers: [AppService, QueryService],
})
export class AppModule {}
