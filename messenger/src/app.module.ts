import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModue } from './prisma/prisma.module';
import { RoomModul } from './room/room.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { HttpExceptionFilter } from './filter/HttpException.filer';
import { JwtAccessGuard } from './auth/guard/jwtAccess.guard';

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
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_GUARD, useClass: JwtAccessGuard },
  ],
})
export class AppModule {}
