import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  createUser(email: string, password: string, name: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private prisma: PrismaService) {}

  // Criar um novo usuário
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }

  // Buscar todos os usuários
  async findAll() {
    return this.prisma.user.findMany();
  }

  // Buscar um usuário pelo ID
  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id: Number(id) },
    });
  }

  // Buscar um usuário pelo email
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // Buscar um usuário pelo ID (alternativo para tipos diferentes)
  async findById(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
