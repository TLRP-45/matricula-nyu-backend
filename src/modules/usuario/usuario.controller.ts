import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';

import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';


import { EstudianteService } from './usuario.service';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { EstadoToma } from './estado-toma.enum';

export class CambiarEstadoTomaDTO {
  @ApiProperty({
    enum: EstadoToma,
    example: EstadoToma.APROBADO,
    description: 'Nuevo estado de la toma de oferta',
  })
  @IsEnum(EstadoToma)
  estado!: EstadoToma;
}

@ApiTags('Estudiante')
@Controller('estudiante')
export class UsuarioController {
  constructor(
    private readonly estudianteService: EstudianteService,
  ) {}

  @Patch('toma/:id/estado')
  @ApiOperation({
    summary: 'Cambiar el estado de una toma de oferta',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID de la toma de oferta',
    example: 15,
  })
  @ApiBody({
    type: CambiarEstadoTomaDTO,
  })
  @ApiResponse({
    status: 200,
    description: 'Estado actualizado correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'La toma de oferta no existe.',
  })
  cambiarEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CambiarEstadoTomaDTO,
  ) {
    return this.estudianteService.cambiarEstado(
      id,
      dto.estado,
    );
  }
}