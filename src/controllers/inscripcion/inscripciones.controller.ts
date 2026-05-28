import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InscripcionesService } from '../../services/inscripcion/inscripciones.service';
import { ApiProperty } from '@nestjs/swagger';

class InscripcionDto {
  @ApiProperty({
    description: 'ID del estudiante que desea inscribirse',
    type: Number,
    example: 12,
  })
  ID_estudiante!: number;

  @ApiProperty({
    description:
      'ID de la oferta académica. Puede ser un número único o un arreglo de IDs para inscripción múltiple.',
    oneOf: [
      { type: 'number', example: 5 },
      { type: 'array', items: { type: 'number' }, example: [3, 7, 9] },
    ],
  })
  ID_oferta!: number | number[];
}

@ApiTags('Inscripciones')
@Controller('inscripciones')
export class InscripcionesController {
  constructor(private readonly service: InscripcionesService) {}

  @Post()
  @ApiOperation({ summary: 'Inscribir estudiante en una o varias ofertas' })
  @ApiBody({ type: InscripcionDto })
  @ApiResponse({
    status: 201,
    description: 'Inscripción realizada correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o faltantes',
  })
  async inscribir(@Body() dto: InscripcionDto) {
    if (!Array.isArray(dto.ID_oferta)) {
      return await this.inscribirUnico(dto.ID_estudiante, dto.ID_oferta);
    } else {
      return Promise.all(
        dto.ID_oferta.map((of) =>
          this.inscribirUnico(dto.ID_estudiante, of),
        ),
      );
    }
  }

  @ApiOperation({ summary: 'Inscribir estudiante en una oferta específica' })
  async inscribirUnico(estudiante: number, oferta: number) {
    return this.service.inscribir(estudiante, oferta);
  }
}