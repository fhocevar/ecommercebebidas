import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createOrder(cartItems: { productId: number; quantity: number }[], userId: number) {
    // Calcular o total do pedido
    let total = 0;

    for (const item of cartItems) {
      const product = await this.prisma.product.findUnique({ where: { id: item.productId } });

      if (!product || product.quantity < item.quantity) {
        throw new Error('Produto indisponível ou quantidade insuficiente.');
      }

      total += product.price * item.quantity;
    }

    // Criar o pedido com os itens do pedido (OrderItem)
    const order = await this.prisma.order.create({
      data: {
        userId,
        total,
        products: {
          create: cartItems.map((item) => ({
            product: { connect: { id: item.productId } }, // Conectar produto existente
            quantity: item.quantity, // Definir a quantidade do produto no pedido
          })),
        },
      },
    });

    // Atualizar o estoque dos produtos
    for (const item of cartItems) {
      await this.prisma.product.update({
        where: { id: item.productId },
        data: { quantity: { decrement: item.quantity } }, // Decrementa a quantidade do produto
      });
    }

    return order;
  }
}
