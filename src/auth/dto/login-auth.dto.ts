import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class loginAuthDto extends PartialType(CreateAuthDto) {

     @IsEmail()
      @IsNotEmpty()
      email: string;
    
      @MinLength(5)
      @IsNotEmpty()
      password: string;
}
