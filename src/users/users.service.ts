import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, userDocoument } from './entities/user.entity';
import{Model, Types}from 'mongoose';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel:Model <userDocoument>){}
  async create(createUserDto: CreateUserDto) {
      const exisitingUser= await  this.findByEmail(createUserDto.email);
      if(exisitingUser){
         throw new BadRequestException('Email already in use');
      }
    const newUser= await this.userModel.create(createUserDto);
     if (!newUser) {
    throw new BadRequestException('User creation failed');
  }

    return newUser;
  }

  async findAll() {
    return  await this.userModel.find({});
  }

   async findOne(id: string) {
    const userObjectId=new Types.ObjectId(id);
    const user= await this.userModel.findOne(userObjectId);
    if(!user){
      throw  new NotFoundException(`user with ${userObjectId} not found`)
    }
    return user;
  }

 async findByEmail(email: string) {
  return await this.userModel.findOne({ email });
}

  async update(id: string, updateUserDto: UpdateUserDto) {
     const userObjectId=new Types.ObjectId(id);
     const user=await this.userModel.findByIdAndUpdate(userObjectId,updateUserDto);
     if(!user){
      throw  new NotFoundException(`user with ${userObjectId} not found`)
    }
    return user;
  }

  async remove(id: string) {
  const userObjectId=new Types.ObjectId(id);
   const deletedUser=await this.userModel.findOneAndDelete(userObjectId);
   if(!deletedUser){
      throw  new NotFoundException(`user with ${userObjectId} not found`)
    }
    return `This action removes a #${id} user`;
  }
}
