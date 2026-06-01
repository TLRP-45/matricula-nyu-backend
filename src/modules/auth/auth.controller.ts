import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { Public } from './public.decorator';
import { Roles } from './roles/roles.decorator';
import { RolUsuario } from '../usuario/rol-usuario.enum';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from './roles/roles.guard';

@ApiTags('Auth')
@Controller('auth')
@UseGuards(RolesGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión y obtener token' })
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO.rut, loginDTO.password);
  }

  @Get('admin')
  @Roles(RolUsuario.Admin)
  @ApiOperation({ summary: 'Endpoint accesible solo por administradores' })
  adminTest() {
    return {
      message: 'hello admin',
    };
  }

  @Get('student')
  @Roles(RolUsuario.Estudiante)
  @ApiOperation({ summary: 'Endpoint accesible solo por estudiantes' })
  studentTest() {
    return {
      message: 'hello student',
    };
  }
}