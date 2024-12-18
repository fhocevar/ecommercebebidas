import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [AuthModule, ProductsModule, OrdersModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
