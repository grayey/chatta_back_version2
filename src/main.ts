import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as bodyParser from 'body-parser';
async function bootstrap() {
 
  const port = process.env.PORT || 9000;
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.enableCors();
  console.log(port);
  await app.listen(port);
}

bootstrap();
