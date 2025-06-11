// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { TodoModule } from './todos/todo.module';
// import { ConfigModule } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';

// @Module({
//   imports: [TodoModule,ConfigModule.forRoot({isGlobal:true})
//    , MongooseModule.forRoot(process.env.MONGO_URL??'http://localhost:27017/todo_db')
//   ],//envFilePath
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}


// app.module.ts
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TodoController } from './todos/todos.controller';
import { TodoService } from './todos/todoService';
import { LoggerMiddleware } from './middelWare/loginMiddelWare';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Todo, TodoSchema } from './todos/todoScheme';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todos/todo.module';
import path from 'path';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    MongooseModule.forRoot(process.env.MONGO_URL!),
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),

    AuthModule,
    UsersModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule 
implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({path:'todos',method:RequestMethod.DELETE})
      .forRoutes('*'); 
  }
}
