import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthGuard } from './auth.guard'; // Adicionado

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret', // Configuração de segredo
      signOptions: { expiresIn: '1h' }, // Tempo de expiração do token
    }),
  ],
  providers: [
    AuthService,
    PrismaService,
    JwtStrategy,
    AuthGuard, // Adicionado
  ],
  controllers: [AuthController],
  exports: [AuthService, AuthGuard], // Exporta o AuthGuard para uso em outros módulos
})
export class AuthModule {}
