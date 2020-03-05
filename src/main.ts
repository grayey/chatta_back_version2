import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService
} from '@nestjs/config';
async function bootstrap() {
  const port = 9000;
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService()
  const dbUser = configService.get<string>('port');
    console.log("message to server", dbUser)
  app.enableCors();
  console.log(port);
  await app.listen(port);
}

bootstrap();
