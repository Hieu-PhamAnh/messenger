import { Injectable } from '@nestjs/common';
import { RefreshToken } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TokenService {
  constructor(private prisma: PrismaService) {}

  async storeRefreshToken(userId: number, token: string) {
    const newToken = await this.prisma.refreshToken.upsert({
      where: { userId: userId },
      update: { token: token },
      create: { userId: userId, token: token },
    });
    return newToken;
  }

  async findRefreshToken(token: string): Promise<RefreshToken | null> {
    const checkToken = await this.prisma.refreshToken.findFirst({
      where: { token: token },
    });
    return checkToken;
  }
}
