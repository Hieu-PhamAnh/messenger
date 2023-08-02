import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModue } from './prisma/prisma.module';
import { RoomModul } from './room/room.module';
import { TestCommandModule } from './test-command/test-command.module';

@Module({
  imports: [
    UserModule,
    MessageModule,
    AuthModule,
    PrismaModue,
    RoomModul,
    TestCommandModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
