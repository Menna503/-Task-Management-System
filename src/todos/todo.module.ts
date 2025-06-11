import { Module } from '@nestjs/common';
import { TodoController } from './todos.controller';
import { TodoService } from './todoService';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './todoScheme';
@Module({
  imports: 
  [
    MongooseModule.forFeature([{name:Todo.name,schema:TodoSchema}])
  ],
  controllers: [TodoController],
  providers: [TodoService],
  exports:[TodoService]
})
export class TodoModule {}
