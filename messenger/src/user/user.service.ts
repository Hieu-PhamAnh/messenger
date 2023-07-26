import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto, SearchDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(id: number) {
    try {
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
    } catch (error) {
      throw error;
    }
  }

  async searchByUsername(dto: SearchDto) {
    try {
      // console.log(dto);
      const users = await this.prisma.user.findMany({
        where: {
          userName: {
            contains: dto.userName,
          },
        },
        select: {
          id: true,
          userName: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      });
      if (users.length === 0) {
        throw new NotFoundException('User not found');
      }
      return { message: 'success', total: users.length, data: users };
    } catch (error) {
      throw error;
    }
  }

  async editUser(id: number, dto: EditUserDto) {
    try {
      console.log({ id: id, dto: dto });
      let user = await this.prisma.user.findFirst({ where: { id: id } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      user = await this.prisma.user.update({
        where: { id: id },
        data: dto,
      });
      return { message: 'update success', user: user };
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: number) {
    try {
      let user = await this.prisma.user.findFirst({ where: { id: id } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      user = await this.prisma.user.delete({ where: { id: id } });
      return { message: 'delete success', user: user };
    } catch (error) {
      throw error;
    }
  }
}
