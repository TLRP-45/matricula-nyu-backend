import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { Public } from './public.decorator';
import { Roles } from './roles/roles.decorator';
import { RolUsuario } from '../estudiante/rol-usuario.enum';
import { RolesGuard } from './roles/roles.guard';

@Controller('auth')
@UseGuards(RolesGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO.rut, loginDTO.password);
  }

  @Get('admin')
  @Roles(RolUsuario.Admin)
  adminTest() {
    return {
      message: 'hello admin',
    }
  }

  @Get('student')
  @Roles(RolUsuario.Estudiante)
  studentTest() {
    return {
      message: 'hello student',
    }
  }
}
