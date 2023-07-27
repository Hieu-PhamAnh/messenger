import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto, EditMessageDto } from './dto';
import { async } from 'rxjs';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async createMessage(dto: CreateMessageDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id: dto.senderID },
      });
      const room = await this.prisma.room.findFirst({
        where: { id: dto.roomId },
      });
      if (!user || !room) {
        throw new NotFoundException('Room or User not found');
      }
      const message = await this.prisma.message.create({ data: dto });
      return message;
    } catch (error) {
      throw error;
    }
  }

  async getRoomMessage(id: number) {
    try {
      const data = await this.prisma.message.findMany({
        where: { roomId: id },
      });
      return { message: 'success', total: data.length, data: data };
    } catch (error) {
      throw error;
    }
  }

  async getMessage(id: number) {
    try {
      const message = await this.prisma.message.findFirst({
        where: { id: id },
      });
      if (!message) {
        throw new NotFoundException('Message not found');
      }
      return message;
    } catch (error) {
      throw error;
    }
  }

  async editMessage(id: number, dto: EditMessageDto) {
    try {
      console.log({ id: id, dto: dto });
      let message = await this.prisma.message.findFirst({ where: { id: id } });
      if (!message) {
        throw new NotFoundException('Message not found');
      }
      message = await this.prisma.message.update({
        where: { id: id },
        data: dto,
      });
      return { message: 'update success', data: message };
    } catch (error) {
      throw error;
    }
  }

  async deleteMessage(id: number) {
    try {
      let message = await this.prisma.message.findFirst({ where: { id: id } });
      if (!message) {
        throw new NotFoundException('Message not found');
      }
      message = await this.prisma.message.delete({ where: { id: id } });
      return { message: 'delete success', data: message };
    } catch (error) {
      throw error;
    }
  }
}
