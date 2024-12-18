import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey', // Troque por uma variável de ambiente para maior segurança
    });
  }

  async validate(payload: any) {
    // Retorne informações que você deseja anexar ao objeto de requisição
    return { userId: payload.sub, username: payload.username };
  }
}
