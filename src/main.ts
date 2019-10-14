import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
    const process_vars = require('minimist')(process.argv.slice(2))._;
    const port = (process_vars[0])?process_vars[0]:9000;
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    await app.listen(port);
}

bootstrap();
