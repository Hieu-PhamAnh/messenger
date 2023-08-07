import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { RoomService } from 'src/room/room.service';

@Module({
  controllers: [MessageController],
  providers: [MessageService, RoomService],
})
export class MessageModule {}
