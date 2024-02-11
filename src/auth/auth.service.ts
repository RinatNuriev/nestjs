import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/createUserDto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(userDto: CreateUserDto) {
    const user = await this.usersService.findUser(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return this.generateToken(user);
    }
    throw new UnauthorizedException({
      message: 'Некорректный email или пароль',
    });
  }

  async registration(userDto: CreateUserDto) {
    const user = await this.usersService.findUser(userDto.email);
    if (user) {
      throw new HttpException(
        'Пользователь существует с таким email',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const createdUser = await this.usersService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(createdUser);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
