import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotev from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './interceptor/logging.interceptor';

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
