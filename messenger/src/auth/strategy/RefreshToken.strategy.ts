import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenService } from 'tokenDB/token.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private tokenService: TokenService, config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('REFRESH_KEY'),
      passReqToCallback: true,
    });
  }
  async validate(req: Request, payload: { sub: number; username: string }) {
    // console.log(req.headers);
    const auth = req.headers['authorization'];
    const [type, token] = auth?.split(' ') ?? [];
    const check = await this.tokenService.findRefreshToken(token);
    // console.log(check);
    if (check === null) {
      return false;
    }
    return payload;
  }
}
