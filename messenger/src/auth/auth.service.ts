import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, CreateUserDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(dto: CreateUserDto) {
    // console.log(dto);
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

  async signIn(
    dto: AuthDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
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
      const access_token = await this.spawnAccessToken(user.id, user.userName);
      const refresh_token = await this.spawnRefreshToken(
        user.id,
        user.userName,
      );
      return { access_token, refresh_token };
    } catch (error) {
      throw error;
    }
  }

  async spawnAccessToken(id: number, username: string): Promise<string> {
    const payload = { sub: id, username };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: this.config.get('ACCESS_EXP'),
      secret: this.config.get('ACCESS_KEY'),
    });
    return token;
  }

  async spawnRefreshToken(id: number, username: string): Promise<string> {
    const payload = { sub: id, username };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: this.config.get('REFRESH_EXP'),
      secret: this.config.get('REFRESH_KEY'),
    });
    return token;
  }
}
