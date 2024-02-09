import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/CreateRoleDto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(roleDto: CreateRoleDto) {
    const role = await this.roleRepository.create(roleDto);
    return role;
  }

  async getRoleByValue(value: string) {
    const role = this.roleRepository.findOne({ where: { value } });
    return role;
  }
}
