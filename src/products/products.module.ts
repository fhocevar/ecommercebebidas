import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from '../../prisma/prisma.module'; // Importe o PrismaModule

@Module({
  imports: [PrismaModule], // Adicione o PrismaModule aqui
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
