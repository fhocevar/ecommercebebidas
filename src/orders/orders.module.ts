// orders.module.ts
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Adicione o PrismaModule aqui
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
