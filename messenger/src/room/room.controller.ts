import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomDto } from './dto';

@Controller('rooms')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Post('')
  createRoom(@Body() dto: RoomDto) {
    return this.roomService.createRoom(dto);
  }

  @Get('test')
  test(@Body() dto: RoomDto) {
    return this.roomService.findRoom(dto);
  }
}
