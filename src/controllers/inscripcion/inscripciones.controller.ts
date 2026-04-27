import { Controller, Post, Body, Get } from '@nestjs/common';
import { InscripcionesService } from '../../services/inscripcion/inscripciones.service';

class InscripcionDto {
  ID_estudiante!: number;
  ID_oferta!: number | number[];
}

@Controller('inscripciones')
export class InscripcionesController {
  constructor(private readonly service: InscripcionesService) {}

  @Post()
  async inscribir(@Body() dto: InscripcionDto){
    if (!Array.isArray(dto.ID_oferta)) {
      return await this.inscribirUnico(dto.ID_estudiante, dto.ID_oferta)
    } else {
      return Promise.all(
        dto.ID_oferta.map(of =>
          this.inscribirUnico(dto.ID_estudiante, of)
        )
      );
    }
  }

  async inscribirUnico(estudiante: number, oferta: number) {
    return this.service.inscribir(
      estudiante,
      oferta,
    );
  }
}