import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'userName' });
  }
  async validate(username: string, password: string): Promise<any> {
    const user = this.authService.testGuard(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
