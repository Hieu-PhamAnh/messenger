import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, CreateUserDto } from './dto';
import { LocalAuthGuard } from './guard/local.guard';
import { JwtAccessGuard } from './guard/jwtAccess.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() dto: CreateUserDto) {
    return this.authService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async localGuard(@Request() req) {
    const user = req.user;
    return user;
  }

  @UseGuards(JwtAccessGuard)
  @Post('test-jwt-guard')
  testJwt(@Request() req) {
    return req.user;
  }
}
