import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'mail@mail.ru' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Incorrect mail' })
  readonly email: string;

  @ApiProperty({ example: 'password' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Коротенький или слишком длинный пароль' })
  readonly password: string;
}
