import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/createUserDto';
import { RolesService } from '../roles/roles.service';
import * as bcrypt from 'bcrypt';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(userDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userRepository.create({
      ...userDto,
      password: hashPassword,
    });
    const role = await this.roleService.getRoleByValue('ADMIN');
    console.log('role', role);
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async findUser(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async addRole(roleDto: AddRoleDto) {
    const user = await this.userRepository.findByPk(roleDto.userId);
    const role = await this.roleService.getRoleByValue(roleDto.value);

    if (role && user) {
      await user.$add('role', role.id);
      return roleDto;
    }

    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.NOT_FOUND,
    );
  }

  async banUser(banDto: BanUserDto) {
    const user = await this.userRepository.findByPk(banDto.userId);
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    await user.save();

    return user;
  }
}
