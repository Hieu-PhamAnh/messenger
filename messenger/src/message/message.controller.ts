import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto, EditMessageDto } from './dto';
import { CustomParseIntPipe } from 'src/CustomPipe/ParseIdPipe';
import { JwtAccessGuard } from 'src/auth/guard/jwtAccess.guard';

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
