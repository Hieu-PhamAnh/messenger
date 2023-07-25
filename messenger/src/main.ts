import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotev from 'dotenv';

async function bootstrap() {
  dotev.config();

  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
}
bootstrap();
