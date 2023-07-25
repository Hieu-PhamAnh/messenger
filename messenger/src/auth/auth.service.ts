import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(dto: AuthDto) {
    console.log(dto);
    try {
      const newUser = await this.prisma.user.create({
        data: dto,
      });
      delete newUser.password;
      return { message: 'signup complete' };
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ForbiddenException('Username already taken');
      }
      throw error;
    }
  }

  async signIn(dto: AuthDto) {
    console.log(dto);
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          userName: dto.userName,
        },
      });
      if (!user) {
        throw new NotFoundException('username doesnt match');
      }
      if (dto.password !== user.password) {
        throw new UnauthorizedException('wrong password');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}
