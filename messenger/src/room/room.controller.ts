import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomDto } from './dto';
import {
  CustomParseIntPipe,
  CustomParseIntRoom,
} from 'src/CustomPipe/ParseIdPipe';
import { JwtAccessGuard } from 'src/auth/guard/jwtAccess.guard';
import { HttpExceptionFilter } from 'src/filter/HttpException.filer';

@UseGuards(JwtAccessGuard)
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

  // @UseFilters(HttpExceptionFilter)
  @Get(':id/chat')
  chat(@Param('id', CustomParseIntRoom) id: number) {
    return this.roomService.test(id);
  }

  @Get('allmessage/:id')
  test(@Param('id', CustomParseIntPipe) id: number) {
    return this.roomService.test(id);
  }
}
