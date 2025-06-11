import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TodoService } from 'src/todos/todoService';
import { TodoModule } from 'src/todos/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[TodoModule,MongooseModule.forFeature([{name:User.name,schema:userSchema}])
    ,forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
