import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUserDto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiResponse({ status: 200, type: [User] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('/all')
  async getAll() {
    try {
      return this.usersService.getAllUsers();
    } catch (e) {
      return JSON.stringify(e);
    }
  }

  @ApiOperation({ summary: 'Выдать роль' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  async addRole(@Body() roleDto: AddRoleDto) {
    try {
      return this.usersService.addRole(roleDto);
    } catch (e) {
      return JSON.stringify(e);
    }
  }

  @ApiOperation({ summary: 'Забанить пользователя' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/ban')
  async banUser(@Body() banDto: BanUserDto) {
    try {
      return this.usersService.banUser(banDto);
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
