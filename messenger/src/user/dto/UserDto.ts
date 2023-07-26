import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EditUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;
}

export class SearchDto {
  @IsNotEmpty()
  @IsString()
  userName: string;
}
