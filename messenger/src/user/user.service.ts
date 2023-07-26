import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        userName: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async editUser(id: number, dto: EditUserDto) {
    return { id: id, dto: dto };
  }
}
