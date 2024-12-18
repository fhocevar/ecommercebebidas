import { Injectable } from '@nestjs/common';
   import { PrismaService } from '../../prisma/prisma.service';

   @Injectable()
   export class OrdersService {
     constructor(private prisma: PrismaService) {}

     async createOrder(userId: number, productIds: number[], total: number) {
       return this.prisma.order.create({
         data: {
           userId,
           products: {
             connect: productIds.map(id => ({ id })),
           },
           total,
         },
       });
     }
   }