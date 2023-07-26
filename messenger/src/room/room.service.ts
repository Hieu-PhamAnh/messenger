import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoomDto } from './dto';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}
  async createRoom(dto: RoomDto) {
    try {
      let newRoom = await this.findRoom(dto);
      if (newRoom !== null) {
        return newRoom;
      }
      newRoom = await this.prisma.room.create({ data: dto });
      return newRoom;
    } catch (error) {
      throw error;
    }
  }

  async findRoom(dto: RoomDto) {
    const room = await this.prisma.room.findFirst({
      where: {
        OR: [
          {
            user1: dto.user1,
            user2: dto.user2,
          },
          {
            user1: dto.user2,
            user2: dto.user1,
          },
        ],
      },
    });
    // console.log('Room:', room);
    return room;
  }
}
