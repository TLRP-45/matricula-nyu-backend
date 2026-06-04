import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { CarreraCreateDTO } from './dto/carrera.dto';
import { CarreraEntity } from './carrera.entity';
import { CarreraService } from './carrera.service';
import { ParseIntPipe } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { AsignaturaService } from '../asignatura/asignatura.service';
import { CarreraUpdateDTO } from './dto/carrera-update.dto';
import { IsInt, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { AsignaturaCarreraDto } from '../asignatura/asignatura.controller';
import { ApiProperty, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

export class CarreraAgregarAsignaturaDto {
    @ApiProperty({
        description: 'ID de la asignatura a la que se asociará a la carrera',
        type: Number,
        example: 1
    })
    @IsInt()
    ID_asignatura!: number;

    @ApiProperty({
        description: 'Semestre en el que se ubica esta asignatura dentro de la carrera',
        type: Number,
        example: 2
    })
    @IsInt()
    semestre!: number;

    @ApiProperty({
        description: 'Posición dentro del semestre (orden visual o de malla)',
        type: Number,
        example: 1
    })
    @IsInt()
    posicion!: number;
}

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
  @Get('buscar/nombre/:nombre')
  @ApiOperation({ summary: 'Buscar carrera por nombre exacto' })
  @ApiParam({ name: 'nombre', type: String })
  @ApiResponse({
    status: 200,
    description: 'Carrera encontrada',
  })
  getCarreraPorNombre(@Param('nombre') nombre: string){
    return this.carreraService.getPorNombre(nombre);
  }

  // ───────────────────────────────────────────────────────────────
  @Get('buscar/facultad/:facultad')
  @ApiOperation({ summary: 'Obtener carreras por facultad' })
  @ApiParam({ name: 'facultad', type: String })
  @ApiResponse({
    status: 200,
    description: 'Carreras encontradas',
    isArray: true,
    type: CarreraEntity,
  })
  getCarrerasPorFacultad(@Param('facultad') facultad: string){
    return this.carreraService.getPorFacultad(facultad);
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
  @Get(':id/asignaturas/:semestre')
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
  @Put(':carreraID/actualizar/')
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
  @Put(':carreraID/actualizar/asignatura/push')
  @ApiOperation({
    summary: 'Agregar una asignatura a una carrera',
  })
  @ApiParam({ name: 'carreraID', type: Number })
  @ApiBody({ type: CarreraAgregarAsignaturaDto })
  @ApiResponse({
    status: 200,
    description: 'Asignatura agregada correctamente',
  })
  putPushAsignaturaCarrera(
  @Param('carreraID', ParseIntPipe) carreraID: number,
  @Body() ctaDTO: CarreraAgregarAsignaturaDto){
    if(isNaN(carreraID)) throw new BadRequestException();
    const aux = new AsignaturaCarreraDto();
    aux.ID_carrera = carreraID;
    aux.posicion = ctaDTO.posicion;
    aux.semestre = ctaDTO.semestre;
    return this. asignaturaService.pushCarrera(ctaDTO.ID_asignatura, aux);
  }

  // ───────────────────────────────────────────────────────────────
  @Put(':carreraID/actualizar/asignatura/remove')
  @ApiOperation({
    summary: 'Eliminar una asignatura de una carrera',
  })
  @ApiParam({ name: 'carreraID', type: Number })
  @ApiBody({ type: CarreraEliminarAsignaturaDto })
  @ApiResponse({
    status: 200,
    description: 'Asignatura removida correctamente',
  })
  putRemoveAsignaturaCarrera(
  @Param('carreraID', ParseIntPipe) carreraID: number,
  @Body() ctaDTO: CarreraEliminarAsignaturaDto){
    if(isNaN(carreraID)) throw new BadRequestException();
    const aux = new AsignaturaCarreraDto();
    aux.ID_carrera = carreraID;
    return this. asignaturaService.removeCarrera(ctaDTO.ID_asignatura, aux);
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
}