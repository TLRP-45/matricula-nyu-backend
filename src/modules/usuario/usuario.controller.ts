import { Controller, Get, Param } from '@nestjs/common';
import { EstudianteService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {

  constructor(
    private readonly estudianteService: EstudianteService,
  ) {}

  @Get(':id/comprobante')
  async obtenerComprobante(
    @Param('id') id: string,
  ) {
    return this.estudianteService.generarComprobante(+id);
  }
}