import { Injectable } from '@nestjs/common';
   import { JwtService } from '@nestjs/jwt';
   import * as bcrypt from 'bcryptjs';

   @Injectable()
   export class AuthService {
     constructor(private jwtService: JwtService) {}

     async login(user: any) {
       const payload = { username: user.username, sub: user.userId };
       return {
         access_token: this.jwtService.sign(payload),
       };
     }

     async validateUser(username: string, pass: string): Promise<any> {
       // Lógica de validação do usuário, como verificar senha
     }
   }