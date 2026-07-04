import { Body, Controller, Get, Param, Post, ParseArrayPipe, ParseIntPipe, Delete, Put, BadRequestException, Query, UseGuards } from '@nestjs/common';
import { AsignaturaService } from './asignatura.service';
import { AsignaturaCreateDto } from './dto/asignatura.dto';
import { AsignaturaEntity } from './asignatura.entity';
import { IsArray, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { AsignaturaPutDto } from './dto/asignatura-update.dto';
import { ApiProperty, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { RolUsuario } from '../usuario/rol-usuario.enum';

export class AsignaturaPrerrequisitosDto {
  @ApiProperty({
    description: 'Lista de IDs de asignaturas que son prerrequisitos',
    type: [Number],
    example: [1, 5, 12]
  })
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  ID_prerrequisitos!: number[];
}

export class AsignaturaCarreraDto {
  @ApiProperty({
    description: 'Semestre en el que se ubica esta asignatura dentro de la carrera',
    type: Number,
    example: 2
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  semestre?: number;

  @ApiProperty({
    description: 'Posición dentro del semestre (orden visual o de malla)',
    type: Number,
    example: 1
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  posicion?: number;
}

@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('asignaturas')
export class AsignaturaController {
  constructor(private asignaturaService: AsignaturaService) { }

  // ───────────────────────────────────────────────────────────────
  @Get(':asignaturaID')
  @ApiOperation({ summary: 'Obtener una asignatura por ID' })
  @ApiParam({ name: 'asignaturaID', type: Number, description: 'ID de la asignatura' })
  @ApiResponse({ status: 200, description: 'Asignatura encontrada' })
  @ApiResponse({ status: 400, description: 'ID inválido' })
  @ApiResponse({ status: 404, description: 'Asignatura no encontrada' })
  getAsignatura(@Param('asignaturaID', ParseIntPipe) asignaturaID: number) {
    if (isNaN(asignaturaID)) throw new BadRequestException();
    return this.asignaturaService.getAsignatura(asignaturaID);
  }

  // ───────────────────────────────────────────────────────────────
  @Get(':asignaturaID/usuario/:usuarioID/estado')
  @ApiOperation({ summary: 'Obtener el estado de una asignatura por ID' })
  @ApiParam({ name: 'asignaturaID', type: Number, description: 'ID de la asignatura' })
  @ApiParam({ name: 'usuarioID', type: Number, description: 'ID del estudiante' })
  @ApiResponse({ status: 200, description: 'Estado encontrada' })
  @ApiResponse({ status: 400, description: 'ID inválido' })
  @ApiResponse({ status: 404, description: 'Estado no encontrado' })
  getEstadoAsignatura(@Param('asignaturaID', ParseIntPipe) asignaturaID: number, @Param('usuarioID', ParseIntPipe) usuarioID: number) {
    if (isNaN(asignaturaID)) throw new BadRequestException();
    return this.asignaturaService.getEstadoAsignatura(asignaturaID, usuarioID);
  }

  // ───────────────────────────────────────────────────────────────
  @Get('carrera/:carreraID')
  @ApiOperation({ summary: 'Obtener asignaturas por carrera' })
  @ApiParam({ name: 'carreraID', type: Number, description: 'ID de la carrera' })
  @ApiResponse({ status: 200, description: 'Asignaturas obtenidas' })
  @ApiResponse({ status: 400, description: 'ID inválido' })
  getAsignaturasPorCarrera(@Param('carreraID', ParseIntPipe) carreraID: number) {
    if (isNaN(carreraID)) throw new BadRequestException();
    return this.asignaturaService.getAsignaturasPorCarrera(carreraID);
  }

  // ───────────────────────────────────────────────────────────────
  @Get(':asignaturaID/carrera/:carreraID/prerrequisitos')
  @ApiOperation({ summary: 'Obtener prerrequisitos de una asignatura según una carrera' })
  @ApiParam({ name: 'asignaturaID', type: Number })
  @ApiParam({ name: 'carreraID', type: Number })
  @ApiResponse({ status: 200, description: 'Prerrequisitos encontrados' })
  @ApiResponse({ status: 400, description: 'Parámetros inválidos' })
  getPrerrerequisitosPorCarrera(
    @Param('carreraID', ParseIntPipe) carreraID: number,
    @Param('asignaturaID', ParseIntPipe) asignaturaID: number) {
    if (isNaN(carreraID)) throw new BadRequestException();
    if (isNaN(asignaturaID)) throw new BadRequestException();
    return this.asignaturaService.getPrerrerequisitosPorCarrera(carreraID, asignaturaID);
  }

  // ───────────────────────────────────────────────────────────────
  @Get(':asignaturaID/carrera/:carreraID/tributas')
  @ApiOperation({ summary: 'Obtener tributas de una asignatura según una carrera' })
  @ApiParam({ name: 'asignaturaID', type: Number })
  @ApiParam({ name: 'carreraID', type: Number })
  @ApiResponse({ status: 200, description: 'Tributas encontradas' })
  @ApiResponse({ status: 400, description: 'Parámetros inválidos' })
  getTributasPorCarrera(
    @Param('carreraID', ParseIntPipe) carreraID: number,
    @Param('asignaturaID', ParseIntPipe) asignaturaID: number) {
    if (isNaN(carreraID)) throw new BadRequestException();
    if (isNaN(asignaturaID)) throw new BadRequestException();
    return this.asignaturaService.getTributasPorCarrera(carreraID, asignaturaID);
  }

  // ───────────────────────────────────────────────────────────────
  @Get()
  @ApiOperation({
    summary: 'Buscar asignaturas'
  })
  @ApiQuery({
    name: 'nombre',
    required: false,
    type: String
  })
  @ApiQuery({
    name: 'codigo',
    required: false,
    type: String
  })
  async buscarAsignaturas(
    @Query('nombre') nombre?: string,
    @Query('codigo') codigo?: string,
  ) {
    if (nombre) {
      return this.asignaturaService.getPorNombre(nombre);
    }

    if (codigo) {
      return this.asignaturaService.getPorCodigo(codigo);
    }

    throw new BadRequestException(
      'Debe proporcionar nombre o codigo'
    );
  }

  // ───────────────────────────────────────────────────────────────
  @Post()
  @Roles(RolUsuario.Admin)
  @ApiOperation({ summary: 'Crear una nueva asignatura' })
  @ApiBody({ type: AsignaturaCreateDto })
  @ApiResponse({ status: 201, description: 'Asignatura creada' })
  createAsignatura(@Body() dto: AsignaturaCreateDto): Promise<AsignaturaEntity> {
    return this.asignaturaService.create(dto);
  }

  // ───────────────────────────────────────────────────────────────
  @Delete(':asignaturaID')
  @Roles(RolUsuario.Admin)
  @ApiOperation({ summary: 'Eliminar una asignatura' })
  @ApiParam({ name: 'asignaturaID', type: Number })
  @ApiResponse({ status: 200, description: 'Asignatura eliminada' })
  @ApiResponse({ status: 400, description: 'ID inválido' })
  deleteAsignatura(@Param('asignaturaID', ParseIntPipe) id: number) {
    if (isNaN(id)) throw new BadRequestException();
    return this.asignaturaService.delete(id);
  }

  // ───────────────────────────────────────────────────────────────
  @Post(':asignaturaID/prerrequisitos/')
  @Roles(RolUsuario.Admin)
  @ApiOperation({ summary: 'Añadir prerrequisito a una asignatura' })
  @ApiParam({ name: 'asignaturaID', type: Number })
  @ApiBody({ type: AsignaturaPrerrequisitosDto })
  @ApiResponse({ status: 200, description: 'Prerrequisito agregado' })
  putPushPrerrequisitos(
    @Param('asignaturaID', ParseIntPipe) asignaturaID: number,
    @Body() prerres: AsignaturaPrerrequisitosDto) {
    if (isNaN(asignaturaID)) throw new BadRequestException();
    return this.asignaturaService.pushPrerrequisito(asignaturaID, prerres);
  }

  // ───────────────────────────────────────────────────────────────
  @Delete(':asignaturaID/prerrequisitos/')
  @Roles(RolUsuario.Admin)
  @ApiOperation({ summary: 'Eliminar prerrequisito de una asignatura' })
  @ApiParam({ name: 'asignaturaID', type: Number })
  @ApiBody({ type: AsignaturaPrerrequisitosDto })
  @ApiResponse({ status: 200, description: 'Prerrequisito eliminado' })
  putRemovePrerrequisitos(
    @Param('asignaturaID', ParseIntPipe) asignaturaID: number,
    @Body() prerreID: AsignaturaPrerrequisitosDto) {
    if (isNaN(asignaturaID)) throw new BadRequestException();
    return this.asignaturaService.removePrerrequisito(asignaturaID, prerreID);
  }

  // ───────────────────────────────────────────────────────────────
  @Put(':asignaturaID')
  @Roles(RolUsuario.Admin)
  @ApiOperation({ summary: 'Actualizar asignatura' })
  @ApiParam({ name: 'asignaturaID', type: Number })
  @ApiBody({ type: AsignaturaPutDto })
  @ApiResponse({ status: 200, description: 'Asignatura actualizada' })
  putAsignatura(
    @Param('asignaturaID', ParseIntPipe) asignaturaID: number,
    @Body() dto: AsignaturaPutDto) {
    if (isNaN(asignaturaID)) throw new BadRequestException();
    return this.asignaturaService.update(asignaturaID, dto);
  }

  // ───────────────────────────────────────────────────────────────
  @Put(':asignaturaID/carrera/:carreraID')
  @Roles(RolUsuario.Admin)
  @ApiOperation({ summary: 'Agregar relación Asignatura–Carrera' })
  @ApiParam({ name: 'asignaturaID', type: Number })
  @ApiParam({ name: 'carreraID', type: Number })
  @ApiBody({ type: AsignaturaCarreraDto })
  @ApiResponse({ status: 200, description: 'Relación agregada' })
  putPushAsignaturaCarrera(
    @Param('asignaturaID', ParseIntPipe) asignaturaID: number,
    @Param('carreraID', ParseIntPipe) carreraID: number,
    @Body() dto: AsignaturaCarreraDto) {
    if (isNaN(asignaturaID)) throw new BadRequestException();
    return this.asignaturaService.pushCarrera(asignaturaID, carreraID, dto);
  }

  // ───────────────────────────────────────────────────────────────
  @Delete(':asignaturaID/carrera/:carreraID')
  @Roles(RolUsuario.Admin)
  @ApiOperation({ summary: 'Eliminar relación Asignatura–Carrera' })
  @ApiParam({ name: 'asignaturaID', type: Number })
  @ApiParam({ name: 'carreraID', type: Number })
  @ApiResponse({ status: 200, description: 'Relación eliminada' })
  putRemoveAsignaturaCarrera(
    @Param('asignaturaID', ParseIntPipe) asignaturaID: number,
    @Param('carreraID', ParseIntPipe) carreraID: number) {
    if (isNaN(asignaturaID)) throw new BadRequestException();
    return this.asignaturaService.removeCarrera(asignaturaID, carreraID);
  }
}

// PATCH para estado
