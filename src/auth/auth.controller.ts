import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { loginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createAuthDto: CreateUserDto) {
    const user = await this.authService.register(createAuthDto);
    return {
      status: true,
      data: user,
      massage: 'user added successfully',
    };
  }
  @Post('login')
  async login(@Body() loginAuthDto:loginAuthDto){
    const loginUser=await this.authService.login(loginAuthDto);
      return {
      status: true,
      data:{ token :loginUser},
      massage: 'login successfully',
    };

  }
}
