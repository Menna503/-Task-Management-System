import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TodoService } from 'src/todos/todoService';
import { JwtAuthGuard } from 'src/guards/jwat.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@UseGuards(JwtAuthGuard,RolesGuard)

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly todoService:TodoService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    //  const exisitingUser=await this.usersService.findByEmail(createUserDto.email);
    //  console.log(exisitingUser,"u");
    //  if(exisitingUser){
    //     throw new BadRequestException('Email already in use');
    //  }
    const user= await this.usersService.create(createUserDto)
    return {
      status:true,
      data:user,
      massage:'user added successfully'
    };
  }
@Roles('admin')
  @Get()
   async findAll() {
    return  await this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id:string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
