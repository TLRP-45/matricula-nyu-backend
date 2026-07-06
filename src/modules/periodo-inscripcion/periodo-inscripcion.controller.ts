import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { PeriodoInscripcionService } from './periodo-inscripcion.service';
import { PeriodoInscripcionEntity } from './preiodo-inscripcion.entity';
import { CreatePeriodoInscripcionDto } from './dto/create-periodo-inscripcion.dto';
import { UpdatePeriodoInscripcionDto } from './dto/update-periodo-inscripcion.dto';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { RolUsuario } from '../usuario/rol-usuario.enum';

@ApiTags('Períodos de Inscripción')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('periodos-inscripcion')
export class PeriodoInscripcionController {
  constructor(
    private readonly periodoService: PeriodoInscripcionService,
  ) { }

  @Get()
  @ApiOperation({
    summary:
      'Obtener todos los períodos de inscripción',
  })
  @ApiResponse({
    status: 200,
    description:
      'Lista de períodos obtenida correctamente.',
  })
  async findAll(): Promise<
    PeriodoInscripcionEntity[]
  > {
    return this.periodoService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un período por ID',
  })
  @ApiParam({
    name: 'id',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Período encontrado.',
  })
  @ApiResponse({
    status: 404,
    description: 'Período no encontrado.',
  })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PeriodoInscripcionEntity> {
    return this.periodoService.findOne(id);
  }

  @Post()
  @Roles(RolUsuario.Admin)
  @ApiOperation({
    summary:
      'Crear un nuevo período de inscripción',
  })
  @ApiBody({
    type: CreatePeriodoInscripcionDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Período creado correctamente.',
  })
  async create(
    @Body()
    dto: CreatePeriodoInscripcionDto,
  ): Promise<PeriodoInscripcionEntity> {
    return this.periodoService.create(dto);
  }

  @Put(':id')
  @Roles(RolUsuario.Admin)
  @ApiOperation({
    summary:
      'Actualizar un período de inscripción',
  })
  @ApiParam({
    name: 'id',
    example: 1,
  })
  @ApiBody({
    type: UpdatePeriodoInscripcionDto,
  })
  @ApiResponse({
    status: 200,
    description:
      'Período actualizado correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Período no encontrado.',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    dto: UpdatePeriodoInscripcionDto,
  ): Promise<PeriodoInscripcionEntity> {
    return this.periodoService.update(id, dto);
  }

  @Delete(':id')
  @Roles(RolUsuario.Admin)
  @ApiOperation({
    summary:
      'Eliminar lógicamente un período de inscripción',
  })
  @ApiParam({
    name: 'id',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description:
      'Período eliminado correctamente.',
  })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.periodoService.remove(id);

    return {
      message: `Período de inscripción con ID ${id} eliminado correctamente`,
    };
  }

  @Patch(':id/restore')
  @Roles(RolUsuario.Admin)
  @ApiOperation({
    summary:
      'Restaurar un período eliminado',
  })
  @ApiParam({
    name: 'id',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description:
      'Período restaurado correctamente.',
  })
  async restore(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.periodoService.restore(id);

    return {
      message: `Período de inscripción con ID ${id} restaurado correctamente`,
    };
  }
}
