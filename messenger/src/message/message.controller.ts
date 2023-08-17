import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CustomParseIntPipe } from 'src/Pipe/ParseIdPipe';
import { CreateMessageDto, EditMessageDto } from './dto';
import { MessageService } from './message.service';

// @UseGuards(JwtAccessGuard)
@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post('')
  createMessage(@Body() dto: CreateMessageDto) {
    return this.messageService.createMessage(dto);
  }

  @Get('room/:id')
  getRoomMessages(@Param('id', CustomParseIntPipe) id: number) {
    return this.messageService.getRoomMessage(id);
  }

  @Get(':id')
  getMessage(@Param('id', CustomParseIntPipe) id: number) {
    return this.messageService.getMessage(id);
  }

  @Patch(':id')
  editMessage(
    @Param('id', CustomParseIntPipe) id: number,
    @Body() dto: EditMessageDto,
  ) {
    return this.messageService.editMessage(id, dto);
  }

  @Delete(':id')
  delteMessage(@Param('id', CustomParseIntPipe) id: number) {
    return this.messageService.deleteMessage(id);
  }
}
