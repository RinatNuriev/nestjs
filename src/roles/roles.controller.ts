import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/CreateRoleDto';
import { Role } from './roles.model';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiResponse({ status: 200, type: [Role] })
  @Get('/:value')
  async getOne(@Param('value') value: string) {
    try {
      return await this.roleService.getRoleByValue(value);
    } catch (e) {
      return JSON.stringify(e);
    }
  }

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: [Role] })
  @ApiBody({ type: [CreateRoleDto] })
  @Post('/add')
  async createRole(@Body() createRole: CreateRoleDto) {
    try {
      return await this.roleService.createRole(createRole);
    } catch (e) {
      return JSON.stringify(e);
    }
  }
}
