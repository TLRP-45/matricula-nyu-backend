import { Controller,Post,Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from '../../modules/usuario/usuario.entity';
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';

@ApiTags('Autenticación')
@Controller('autenticacion')
export class AutenticacionController {

  constructor(
    @InjectRepository(UsuarioEntity)
    private usuarioRepo: Repository<UsuarioEntity>,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión con rut y contraseña' })
  @ApiResponse({
    status: 200,
    description: 'Resultado del intento de login (éxito o error)',
  })
  async login(@Body() body: any) {

    const { rut, password } = body;

    // Validar RUT
    if (!rut || !rut.includes('-')) {
      return { success: false, mensaje: "RUT inválido" };
    }

    // Buscar en la base de datos
    const user = await this.usuarioRepo.findOne({
      where: { rut }
    });

    if (!user) {
      return { success: false, mensaje: "Usuario no existe" };
    }

    // Validar contraseña
    if (user.password !== password) {
      return { success: false, mensaje: "Contraseña incorrecta" };
    }

    return {
  success: true,
  mensaje: "Login exitoso",
  user: {
    id: user.ID_estudiante,
    nombre: user.nombre,
    rut: user.rut
  }
};
  }
}
