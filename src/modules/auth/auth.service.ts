import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { JwtPayload } from './interfaces/token.interface';

@Injectable()
export class AuthService {
  async validateToken(payload: JwtPayload): Promise<boolean> {
    return !!payload.username;
  }

  async login({ username }: { username: string }): Promise<string> {
    const payload: JwtPayload = { username };

    return jwt.sign(payload, process.env.JWT_SECRET || 'tests');
  }

  decode(token: string): JwtPayload {
    return jwt.decode(token, {
      json: true,
    } as jwt.DecodeOptions) as JwtPayload;
  }
}
