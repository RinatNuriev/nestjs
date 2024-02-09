import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'mail@mail.ru' })
  readonly email: string;

  @ApiProperty({ example: 'password' })
  @ApiProperty()
  readonly password: string;
}
