import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from '../auth/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  // Valida o usuário por email e senha
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email); // Reutiliza o método do UsersService
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user; // Retorna o usuário sem a senha
      return result;
    }
    return null;
  }

  // Realiza o login e retorna o token JWT
  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new Error('Invalid credentials'); // Valida as credenciais
    }

    const payload = { userId: user.id, email: user.email };
    const token = this.jwtService.sign(payload); // Gera o token JWT

    return { token };
  }
}
