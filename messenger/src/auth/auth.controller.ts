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
import { Public } from './decorator/public.decorator';
import { AuthDto, CreateUserDto } from './dto';
import { JwtRefreshGuard } from './guard/jwtRefresh.guard';
import { LocalAuthGuard } from './guard/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  signUp(@Body() dto: CreateUserDto) {
    return this.authService.signUp(dto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  localGuard(@Request() req) {
    const user = req.user;
    return user;
  }

  // @UseGuards(JwtAccessGuard)
  // @Post('test-jwt-guard')
  // testJwt(@Request() req) {
  //   return req.user;
  // }

  @HttpCode(HttpStatus.OK)
  @Post('test-refresh-token')
  @Public()
  @UseGuards(JwtRefreshGuard)
  testRefresh(@Request() req) {
    const user = req.user;
    // console.log(user);
    return this.authService.refresh(user.sub, user.username);
  }
}
