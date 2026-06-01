import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { EstudianteModule } from '../usuario/usuario.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    EstudianteModule,
    JwtModule.register({
      global: true,
      secret: process.env.AUTH_PK,
      signOptions: { expiresIn: '300s' }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // }
  ],
  exports: [AuthService],
})
export class AuthModule {}
