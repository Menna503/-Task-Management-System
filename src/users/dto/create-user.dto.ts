
import { IsEmail, IsString, MinLength, IsNotEmpty, IsIn } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(5)
  @IsNotEmpty()
  password: string;

 @IsIn(['user', 'admin'])
  role: 'user' | 'admin';
}
