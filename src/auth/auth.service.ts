import { Injectable, UnauthorizedException } from '@nestjs/common';
import { loginAuthDto } from './dto/login-auth.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService,private readonly jwtService:JwtService) {}
  async register(CreateUserDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(CreateUserDto.password, 10);
    const newUser = await this.userService.create({
      ...CreateUserDto,
      password: hashPassword,
    });

    return newUser;
  }

  async login(loginAuthDto:loginAuthDto) {
    const exisitingUser= await this.userService.findByEmail(loginAuthDto.email);
    let isValid
    if(exisitingUser){
       isValid=await bcrypt.compare(loginAuthDto.password,exisitingUser.password)
    }
   if(!isValid){
    throw new UnauthorizedException("Email or Password is wrong");
   }
   const payload={
    name:exisitingUser?._id,
     email:exisitingUser?.email,
      role: exisitingUser?.role
   }
   const token=this.jwtService.signAsync(payload);
    return token;
  }
    async validateToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

}
