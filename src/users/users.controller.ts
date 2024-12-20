import { Controller, Post, Body, Get, Param } from '@nestjs/common';
   import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

   @Controller('users')
   export class UsersController {
     constructor(private readonly usersService: UsersService) {}

     @Post()
   async createUser(@Body() createUserDto: CreateUserDto) {
     const { email, password, name } = createUserDto;
     return this.usersService.createUser(email, password, name);
   }

   @Get()
  async findAll() {
    return this.usersService.findAll();
  }

     @Get(':id')
     async getUserById(@Param('id') id: string) {
       return this.usersService.findById(Number(id));
     }
   }