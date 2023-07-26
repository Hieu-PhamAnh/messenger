import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomDto } from './dto';
import { CustomParseIntPipe } from 'src/CustomPipe/ParseIdPipe';

@Controller('rooms')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Post('')
  createRoom(@Body() dto: RoomDto) {
    return this.roomService.createRoom(dto);
  }

  @Delete(':id')
  deleteRoom(@Param('id', CustomParseIntPipe) id: number) {
    return this.roomService.deleteRoom(id);
  }

  @Get('test')
  test(@Body() dto: RoomDto) {
    return this.roomService.findRoom(dto);
  }
}
