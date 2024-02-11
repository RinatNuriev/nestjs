import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/CreateRoleDto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(roleDto: CreateRoleDto) {
    return await this.roleRepository.create(roleDto);
  }

  async getRoleByValue(value: string) {
    return this.roleRepository.findOne({ where: { value } });
  }
}
