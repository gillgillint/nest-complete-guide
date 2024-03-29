import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookiesSession = require('cookie-session')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookiesSession({
    keys: ['asdf']
  }))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
