import { Controller, Post, Body } from '@nestjs/common';
import { InscripcionesService } from './inscripciones.service';

@Controller('inscripciones')
export class InscripcionesController {
  constructor(private readonly service: InscripcionesService) {}

  @Post()
  inscribir(@Body() body: any) {
    return this.service.inscribir(
      body.estudianteId,
      body.asignaturasIds,
    );
  }
}