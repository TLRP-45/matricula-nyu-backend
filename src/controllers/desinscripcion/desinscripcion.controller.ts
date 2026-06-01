import { Controller, Post, Body, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DesincripcionService } from '../../services/desincripcion/desincripcion.service';
import { EstudianteTomaOfertaEntity } from '../../modules/usuario/estudiante-toma-oferta.entity';

import { IsInt, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';

import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiProperty } from '@nestjs/swagger';

export class DesinscripcionDto {
  @ApiProperty({
    description: 'ID o lista de IDs de toma de oferta a desinscribir',
    example: 12,
    oneOf: [
      { type: 'number' },
      { type: 'array', items: { type: 'number' }, example: [12, 15, 18] }
    ]
  })
  @ValidateIf(o => !Array.isArray(o.ID_toma))
  @Type(() => Number)
  @IsInt()
  ID_toma!: number | number[];
}

@ApiTags('Desinscripción')
@Controller('desinscripcion')
export class DesinscripcionController {
  constructor(
    private readonly desincripcionService: DesincripcionService,
    @InjectRepository(EstudianteTomaOfertaEntity)
    private readonly tomaRepo: Repository<EstudianteTomaOfertaEntity>,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Desinscribir uno o varios registros',
    description:
      'Permite desinscribir una o varias tomas de oferta. Si se envía un número → desinscripción individual. Si se envía un arreglo → desinscripción múltiple.'
  })
  @ApiBody({
    description: 'ID o lista de IDs de toma de oferta a desinscribir',
    type: DesinscripcionDto,
    examples: {
      unico: {
        summary: 'Desinscripción individual',
        value: { ID_toma: 12 }
      },
      multiple: {
        summary: 'Desinscripción múltiple',
        value: { ID_toma: [12, 15, 18] }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Desinscripción exitosa' })
  @ApiResponse({ status: 404, description: 'Alguna inscripción no existe' })
  @ApiResponse({ status: 400, description: 'Desinscripción inválida o no permitida' })
  async desinscribir(@Body() dto: DesinscripcionDto) {
    if (!Array.isArray(dto.ID_toma)) {
      return await this.desinscribirUnico(dto.ID_toma);
    } else {
      return Promise.all(dto.ID_toma.map(id => this.desinscribirUnico(id)));
    }
  }

  @ApiOperation({
    summary: 'Desinscripción interna de un solo registro',
    description: 'Método auxiliar usado por el endpoint principal.'
  })
  @ApiResponse({ status: 200, description: 'Desinscripción realizada correctamente' })
  @ApiResponse({ status: 404, description: 'La toma no existe' })
  @ApiResponse({ status: 400, description: 'No se pudo desinscribir' })
  async desinscribirUnico(tomaID: number) {
    const toma = await this.tomaRepo.findOne({
      where: { ID_toma: tomaID },
      relations: ['estudiante', 'oferta'],
    });

    if (!toma) {
      throw new NotFoundException('Inscripción no encontrada');
    }

    const ok = await this.desincripcionService.Desinscribir(
      toma.estudiante.ID_estudiante,
      toma.oferta.ID_oferta,
    );

    if (!ok) {
      throw new BadRequestException('No se pudo desinscribir');
    }

    return {
      message: 'Desinscripción realizada correctamente',
      estado: 'OK',
    };
  }
}