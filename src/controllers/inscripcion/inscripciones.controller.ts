import { Controller, Post, Body, Get, Delete, Param, ParseIntPipe, NotFoundException, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiBody, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { InscripcionesService } from '../../services/inscripcion/inscripciones.service';
import { ApiProperty } from '@nestjs/swagger';
import { DesincripcionService } from '../../services/desincripcion/desincripcion.service';
import { EstudianteTomaOfertaEntity } from '../../modules/usuario/estudiante-toma-oferta.entity';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Repository } from 'typeorm';
import { IsArray, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

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
    type: [Number],
    example: [3, 7, 9]
  })
  @IsArray()
  @IsInt({each:true})
  @Type(()=> Number)
  ID_oferta!: number[];
}

@ApiTags('Inscripciones')
@Controller('inscripciones')
export class InscripcionesController {
  constructor(
        private readonly service: InscripcionesService,
        private readonly desincripcionService: DesincripcionService,
        @InjectRepository(EstudianteTomaOfertaEntity)
        private readonly tomaRepo: Repository<EstudianteTomaOfertaEntity>
  ) {}

  @Post()
  @ApiOperation({ summary: 'Inscribir estudiante en ofertas' })
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
    const resultados = await Promise.allSettled(
      dto.ID_oferta.map((ofertaId) =>
        this.service.inscribir(
          dto.ID_estudiante,
          ofertaId,
        ),
      ),
    );
    console.log(resultados);
    return resultados;
  }

  @Delete('estudiante/:estudianteID/oferta/:ofertaID')
  @ApiOperation({summary: 'Desinscribir una inscripción'})
  @ApiParam({ name: 'estudianteID', type: Number })
  @ApiParam({ name: 'ofertaID', type: Number })
  @ApiResponse({ status: 200, description: 'Desinscripción exitosa' })
  @ApiResponse({ status: 404, description: 'Inscripción no encontrada' })
  @ApiResponse({ status: 400, description: 'No se pudo desinscribir' })
  async desinscribir(
    @Param('estudianteID', ParseIntPipe) estudianteID: number,
    @Param('ofertaID', ParseIntPipe) ofertaID: number,
  ) {
    if(isNaN(estudianteID) || isNaN(ofertaID)) throw new BadRequestException();
    return await this.desincripcionService.Desinscribir(estudianteID, ofertaID);
  }
}