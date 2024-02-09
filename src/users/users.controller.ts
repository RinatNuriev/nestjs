import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUserDto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiResponse({ status: 200, type: [User] })
  @Get('/all')
  async getAll() {
    try {
      return this.usersService.getAllUsers();
    } catch (e) {
      return JSON.stringify(e);
    }
  }

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: [User] })
  @ApiBody({ type: [CreateUserDto] })
  @Post('/add')
  async createUser(@Body() createUser: CreateUserDto) {
    try {
      return await this.usersService.createUser(createUser);
    } catch (e) {
      return JSON.stringify(e);
    }
  }
}
