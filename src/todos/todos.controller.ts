// import { Body, Controller, Get, HttpCode, Param, Post, Query, Req, Res } from "@nestjs/common"
// import { Response } from "express";
// class createTodo{
//     title:string;description:string
// }
// @Controller('todos')
// export class TodoController{
//     @Post()
//     // @HttpCode(404)
//     //passthrough use return and res togther
//     createTOdo(@Body() todoBody:createTodo,@Res({passthrough:true}) res:Response){
//     //    return `create todo ${todoBody.title} ${todoBody.description}`
//     res.status(201).send(todoBody);
//     //#region use return and res togther
//     res.setHeader('Content-Type','text');
//     return todoBody
//     }
//     //#endregion
//     @Get()
//     findAllTodo(){
//      return "all todo"
//     }
//     @Get(':id')
//     findOneTodo(@Param('id')id:String,@Query('name') name:string){
//        return 'find one todo'+id+"name="+name;
//     }


//day1

import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
  } from '@nestjs/common';
  import { CreateTodo } from './CreateTodo';
import { TodoService } from './todoService';
import { ConfigService } from '@nestjs/config';
import { TodoDocument } from './todoScheme';
  
  // interface Todo {
  //   id: number;
  //   title: string;
  //   description: string;
  // }
  
  interface ApiResponse<T> {
    status: boolean;
    data: T;
    message?: string;
  }
  
  @Controller('todos')
  export class TodoController {
    constructor(private readonly todoService:TodoService,
      private readonly configService:ConfigService
    ){
      const x=this.configService.get('db_url');
      console.log(x);
    }
  
    @Post()
     async createTodo(@Body() todoBody: CreateTodo):  Promise<ApiResponse<TodoDocument>> {
     const newTodo= await this.todoService.create(todoBody);
      return {
        status: true,
        data: newTodo,
        message: 'Todo created successfully',
      };
    }
  
    @Get()
   async findAll(): Promise<ApiResponse<TodoDocument[]>> {
        const ALLTodo= await this.todoService.allTodo();
      return {
        status: true,
        data: ALLTodo,
      };
    }
  
    @Get(':id')
   async findOne(@Param('id') id: string): Promise<ApiResponse<TodoDocument>>  {
      const todo= await this.todoService.findOneTodo(id);
      return {
        status: true,
        data: todo,
        message: 'Todo fetched successfully',
      };
    }
  
    @Delete(':id')
    async removeById(@Param('id') id: string): Promise<ApiResponse<TodoDocument>> {
      const todos= await this.todoService.remove(id);
      return {
        status: true,
        data: todos,
        message: `Todo with ID ${id} deleted successfully`,
      };
    }
  
    @Patch(':id')
    async editTodo(
      @Param('id') id: string,
      @Body() todoBody: CreateTodo,
    ): Promise<ApiResponse<TodoDocument>>{
     
        const updatedTodo= await this.todoService.update(id,todoBody)
      return {
        status: true,
        data: updatedTodo,
        message: 'Todo updated successfully',
      };
    }
  }
  