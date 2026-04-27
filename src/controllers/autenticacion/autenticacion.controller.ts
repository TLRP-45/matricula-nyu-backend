import { Controller,Post,Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from '../../modules/estudiante/estudiante.entity';

@Controller('autenticacion')
export class AutenticacionController {

  constructor(
    @InjectRepository(EstudianteEntity)
    private usuarioRepo: Repository<EstudianteEntity>,
  ) {}

  @Post('login')
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
