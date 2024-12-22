import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard) // Protege a rota com autenticação
  async create(@Body('cartItems') cartItems: Product[], @Body('userId') userId: number) {
    return this.ordersService.createOrder(cartItems, userId);
  }
}
