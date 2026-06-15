import { Body, Controller, Get, Param, Post, Put, Delete, Query } from '@nestjs/common';
import { CarreraCreateDTO } from './dto/carrera.dto';
import { CarreraEntity } from './carrera.entity';
import { CarreraService } from './carrera.service';
import { ParseIntPipe } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { AsignaturaService } from '../asignatura/asignatura.service';
import { CarreraUpdateDTO } from './dto/carrera-update.dto';
import { IsInt, IsArray } from 'class-validator';
import { AsignaturaCarreraDto } from '../asignatura/asignatura.controller';
import { ApiProperty, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';

export class CarreraEliminarAsignaturaDto {
    @ApiProperty({
        description: 'ID de la asignatura a la que se asociará a la carrera',
        type: Number,
        example: 4
    })
    @IsInt()
    ID_asignatura!: number;
}


@Controller('carrera')
export class CarreraController {
  constructor(
    private carreraService: CarreraService,
    private asignaturaService: AsignaturaService
  ) {}

  // ───────────────────────────────────────────────────────────────
  @Get()
  @ApiOperation({ summary: 'Obtener todas las carreras' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todas las carreras',
    type: CarreraEntity,
    isArray: true,
  })
  async getAllCarreras(): Promise<CarreraEntity[]> {
    return await this.carreraService.getAllCarreras();
  }

  // ───────────────────────────────────────────────────────────────
  @Get('estudiante/:estudianteID')
  @ApiOperation({ summary: 'Obtener carrera por estudiante' })
  @ApiParam({ name: 'estudianteID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Carrera del estudiante solicitado',
  })
  getCarreraEstudiante(
    @Param('estudianteID', ParseIntPipe) estudianteID: number,
  ){
    if (isNaN(estudianteID)) throw new BadRequestException();
    return this.carreraService.getCarreraPorEstudiante(estudianteID);
  }

  // ───────────────────────────────────────────────────────────────
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una carrera por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la carrera' })
  @ApiResponse({
    status: 200,
    description: 'Carrera encontrada',
    type: CarreraEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Carrera no encontrada',
  })
  async getCarrera(@Param('id', ParseIntPipe) id: number) {
      if (isNaN(id)) throw new BadRequestException();
      return await this.carreraService.getCarrera(id);
  }

  // ───────────────────────────────────────────────────────────────
  @Get(':id/semestres')
  @ApiOperation({ summary: 'Obtener cuántos semestres tiene una carrera por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la carrera' })
  @ApiResponse({
    status: 200,
    description: 'Carrera encontrada',
    type: CarreraEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Carrera no encontrada',
  })
  async getCarreraSemestres(@Param('id', ParseIntPipe) id: number) {
      if (isNaN(id)) throw new BadRequestException();
      return await this.carreraService.getCarreraSemestres(id);
  }

  // ───────────────────────────────────────────────────────────────
  @Post()
  @ApiOperation({ summary: 'Crear una nueva carrera' })
  @ApiBody({ type: CarreraCreateDTO })
  @ApiResponse({
    status: 201,
    description: 'Carrera creada correctamente',
    type: CarreraEntity,
  })
  crearCarrera(
    @Body() carrera: CarreraCreateDTO,
  ): Promise<CarreraEntity> {
    return this.carreraService.create(carrera);
  }

  // ───────────────────────────────────────────────────────────────
  @Get()
  @ApiOperation({
      summary: 'Buscar carreras'
  })
  @ApiQuery({
      name: 'nombre',
      required: false,
      type: String
  })
  @ApiQuery({
      name: 'facultad',
      required: false,
      type: String
  })
  async buscarCarreras(
      @Query('nombre') nombre?: string,
      @Query('facultad') facultad?: string,
  ) {
      if (nombre) {
          return this.carreraService.getPorNombre(nombre);
      }

      if (facultad) {
          return this.carreraService.getPorFacultad(facultad);
      }

      throw new BadRequestException(
          'Debe proporcionar nombre o facultad'
      );
  }

  // ───────────────────────────────────────────────────────────────
  @Get(':id/asignaturas/')
  @ApiOperation({ summary: 'Obtener asignaturas de una carrera' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Asignaturas encontradas',
  })
  getAsignaturas(@Param('id', ParseIntPipe) id: number){
    if (isNaN(id)) throw new BadRequestException();
    return this.asignaturaService.getAsignaturasPorCarrera(id);
  }

  // ───────────────────────────────────────────────────────────────
  @Get(':id/asignaturas/semestre/:semestre')
  @ApiOperation({ summary: 'Obtener asignaturas por semestre' })
  @ApiParam({ name: 'id', type: Number })
  @ApiParam({ name: 'semestre', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Asignaturas del semestre solicitado',
  })
  getAsignaturasPorSemestre(
    @Param('id', ParseIntPipe) id: number,
    @Param('semestre', ParseIntPipe) semestre: number
  ){
    if (isNaN(id)) throw new BadRequestException();
    return this.asignaturaService.getAsignaturasPorSemestre(id, semestre);
  }

  // ───────────────────────────────────────────────────────────────
  @Put(':carreraID/')
  @ApiOperation({ summary: 'Actualizar carrera' })
  @ApiParam({ name: 'carreraID', type: Number })
  @ApiBody({ type: CarreraUpdateDTO })
  @ApiResponse({
    status: 200,
    description: 'Carrera actualizada correctamente',
  })
  putAsignatura(
  @Param('carreraID', ParseIntPipe) carreraID: number,
  @Body() dto: CarreraUpdateDTO){
      if(isNaN(carreraID)) throw new BadRequestException();
      return this.carreraService.update(carreraID, dto);
  }

  // ───────────────────────────────────────────────────────────────
  @Put(':carreraID/asignatura/:asignaturaID')
  @ApiOperation({
    summary: 'Agregar una asignatura a una carrera',
  })
  @ApiParam({ name: 'carreraID', type: Number })
  @ApiParam({ name: 'asignaturaID', type: Number })
  @ApiBody({ type: AsignaturaCarreraDto })
  @ApiResponse({
    status: 200,
    description: 'Asignatura agregada correctamente',
  })
  putPushAsignaturaCarrera(
  @Param('carreraID', ParseIntPipe) carreraID: number,
  @Param('asignaturaID', ParseIntPipe) asignaturaID: number,
  @Body() ctaDTO: AsignaturaCarreraDto){
    if(isNaN(carreraID)) throw new BadRequestException();
    return this. asignaturaService.pushCarrera(asignaturaID, carreraID, ctaDTO);
  }

  // ───────────────────────────────────────────────────────────────
  @Delete(':carreraID/asignatura/:asignaturaID')
  @ApiOperation({
    summary: 'Eliminar una asignatura de una carrera',
  })
  @ApiParam({ name: 'carreraID', type: Number })
  @ApiParam({ name: 'asignaturaID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Asignatura removida correctamente',
  })
  putRemoveAsignaturaCarrera(
  @Param('carreraID', ParseIntPipe) carreraID: number,
  @Param('asignaturaID', ParseIntPipe) asignaturaID: number){
    if(isNaN(carreraID)) throw new BadRequestException();
    return this. asignaturaService.removeCarrera(asignaturaID, carreraID);
  }

  // ───────────────────────────────────────────────────────────────
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una carrera' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Carrera eliminada' })
  @ApiResponse({ status: 400, description: 'ID inválido' })
  deleteAsignatura(@Param('id', ParseIntPipe) id: number) {
      if (isNaN(id)) throw new BadRequestException();
      return this.carreraService.delete(id);
  }

  // ───────────────────────────────────────────────────────────────
  @Delete(':carreraID/asignaturas/semestre/:semestre')
  @ApiOperation({
    summary: 'Eliminar asignaturas de una carrera por semestre',
  })
  @ApiParam({ name: 'carreraID', type: Number })
  @ApiParam({ name: 'semestre', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Asignaturas borradas correctamente',
  })
  putDeleteAsignaturasPorSemestre(
  @Param('carreraID', ParseIntPipe) carreraID: number,
  @Param('semestre', ParseIntPipe) semestre: number){
    if(isNaN(carreraID)) throw new BadRequestException();
    return this.carreraService.deletePorSemestre(carreraID, semestre);
  }

  // ───────────────────────────────────────────────────────────────
  @Get(':carreraID/asignatura/:asignaturaID/prerrequisitos')
  @ApiOperation({ summary: 'Obtener prerrequisitos de una asignatura según una carrera' })
  @ApiParam({ name: 'asignaturaID', type: Number })
  @ApiParam({ name: 'carreraID', type: Number })
  @ApiResponse({ status: 200, description: 'Prerrequisitos encontrados' })
  @ApiResponse({ status: 400, description: 'Parámetros inválidos' })
  getPrerrerequisitosPorCarrera(
  @Param('carreraID', ParseIntPipe) carreraID: number,
  @Param('asignaturaID', ParseIntPipe) asignaturaID: number){
      if (isNaN(carreraID)) throw new BadRequestException();
      if (isNaN(asignaturaID)) throw new BadRequestException();
      return this.asignaturaService.getPrerrerequisitosPorCarrera(carreraID, asignaturaID);
  }

  // ───────────────────────────────────────────────────────────────
    @Get(':carreraID/asignatura/:asignaturaID/tributas')
    @ApiOperation({ summary: 'Obtener tributas de una asignatura según una carrera' })
    @ApiParam({ name: 'asignaturaID', type: Number })
    @ApiParam({ name: 'carreraID', type: Number })
    @ApiResponse({ status: 200, description: 'Tributas encontradas' })
    @ApiResponse({ status: 400, description: 'Parámetros inválidos' })
    getTributasPorCarrera(
    @Param('carreraID', ParseIntPipe) carreraID: number,
    @Param('asignaturaID', ParseIntPipe) asignaturaID: number){
        if (isNaN(carreraID)) throw new BadRequestException();
        if (isNaN(asignaturaID)) throw new BadRequestException();
        return this.asignaturaService.getTributasPorCarrera(carreraID, asignaturaID);
    }
}