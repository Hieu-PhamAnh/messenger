import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotev from 'dotenv';
import { AppModule } from './app.module';

async function bootstrap() {
  dotev.config();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // app.useGlobalInterceptors(new LoggingInterceptor());
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
