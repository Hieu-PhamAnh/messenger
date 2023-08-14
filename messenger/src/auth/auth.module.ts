import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtAccessStrategy } from './strategy/jwt.strategy';
import { TokenModule } from 'tokenDB/token.module';

@Module({
  imports: [JwtModule.register({}), PassportModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtAccessStrategy],
})
export class AuthModule {}
