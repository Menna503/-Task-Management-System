import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[ forwardRef(() => UsersModule),JwtModule.registerAsync({
    useFactory:()=>({
    secret:process.env.JWT_SECRET,
    signOptions:{expiresIn:'1h'}
    })
  })],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthService]
})
export class AuthModule {}
