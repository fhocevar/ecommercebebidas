import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // Criar um novo produto utilizando o DTO
  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  // Criar um novo produto utilizando dados diretamente (caso não seja necessário um DTO)
  async createProduct(data: { name: string; description: string; price: number; quantity: number }) {
    return this.prisma.product.create({ data });
  }

  // Buscar todos os produtos
  async getProducts() {
    return this.prisma.product.findMany();
  }
}
