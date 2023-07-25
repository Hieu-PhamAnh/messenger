import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModue } from './prisma/prisma.module';

@Module({
  imports: [UserModule, MessageModule, AuthModule, PrismaModue],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
