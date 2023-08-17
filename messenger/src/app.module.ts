import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModue } from './prisma/prisma.module';
import { RoomModul } from './room/room.module';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptor/logging.interceptor';

@Module({
  imports: [
    UserModule,
    MessageModule,
    AuthModule,
    PrismaModue,
    RoomModul,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class AppModule {}
