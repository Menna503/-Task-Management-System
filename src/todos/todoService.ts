import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { CreateTodo } from "./CreateTodo";
import { Todo as TodoModel, TodoDocument } from "./todoScheme";
import{Model}from 'mongoose';
// interface Todo {
//     id: number;
//     title: string;
//     description: string;
//   }
@Injectable()
export class TodoService {
  constructor(@InjectModel(TodoModel.name) private todoModel: Model<TodoDocument>) {
    console.log("todo service")
  }
    // private todos: Todo[] = [
    //     { id: 1, title: 'Sample Todo', description: 'This is a sample todo' },
    //   ];
    create(createTodo:CreateTodo) {
   
    const newTodo=new this.todoModel(createTodo);
    return newTodo.save();
  }
  async allTodo(){
    return  await this.todoModel.find({});
   }
 async  findOneTodo(id:string){
    const todo =  await this.todoModel.findById(id);
      if (!todo) {
        throw new NotFoundException(`Todo with ID ${id} not found`);
      }
      return todo
   }
  async remove(id:string){
    const found =  await this.todoModel.findByIdAndDelete(id);
    if (!found) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
   
    return found
   }
   async update(id:string,todoBody:CreateTodo){
    const todo = await this.todoModel.findByIdAndUpdate(id,todoBody)
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
   }
   
}
