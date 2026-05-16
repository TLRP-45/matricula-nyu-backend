import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CarreraCreateDTO } from './dto/carrera.dto';
import { CarreraEntity } from './carrera.entity';
import { CarreraService } from './carrera.service';
import { ParseIntPipe } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { AsignaturaService } from '../asignatura/asignatura.service';
import { CarreraUpdateDTO } from './dto/carrera-update.dto';
import { IsInt } from 'class-validator';
import { AsignaturaCarreraDto } from '../asignatura/asignatura.controller';

export class CarreraAsignaturaDto {
    @IsInt()
    ID_asignatura!: number;

    @IsInt()
    semestre!: number;

    @IsInt()
    posicion!: number;
}


@Controller('carrera')
export class CarreraController {
  constructor(
    private carreraService: CarreraService,
    private asignaturaService: AsignaturaService
  ) {}

  @Get()
  async getAllCarreras(): Promise<CarreraEntity[]> {
    return await this.carreraService.getAllCarreras();
  }

  @Get(':id')
  async getCarrera(@Param('id', ParseIntPipe) id: number) {
      if (isNaN(id)) throw new BadRequestException();
      return await this.carreraService.getCarrera(id);
  }

  @Post()
  crearCarrera(
    @Body() carrera: CarreraCreateDTO,
  ): Promise<CarreraEntity> {
    return this.carreraService.create(carrera);
  }

  @Get(':nombre')
  getCarreraPorNombre(@Param('nombre') nombre: string){
    return this.carreraService.getPorNombre(nombre);
  }

  @Get(':facultad')
  getCarrerasPorFacultad(@Param('facultad') facultad: string){
    return this.carreraService.getPorFacultad(facultad);
  }

  @Get(':id/asignaturas/')
  getAsignaturas(@Param('id', ParseIntPipe) id: number){
    if (isNaN(id)) throw new BadRequestException();
    return this.asignaturaService.getAsignaturasPorCarrera(id);
  }

  @Get(':id/asignaturas/:semestre')
  getAsignaturasPorSemestre(
    @Param('id', ParseIntPipe) id: number,
    @Param('semestre', ParseIntPipe) semestre: number
  ){
    if (isNaN(id)) throw new BadRequestException();
    return this.asignaturaService.getAsignaturasPorSemestre(id, semestre);
  }

  @Put(':carreraID/actualizar/')
  putAsignatura(
  @Param('carreraID', ParseIntPipe) carreraID: number,
  @Body() dto: CarreraUpdateDTO){
      if(isNaN(carreraID)) throw new BadRequestException();
      return this.asignaturaService.update(carreraID, dto);
  }

  @Put(':carreraID/actualizar/asignatura/push')
  putPushAsignaturaCarrera(
  @Param('carreraID', ParseIntPipe) carreraID: number,
  @Body() ctaDTO: CarreraAsignaturaDto){
    if(isNaN(carreraID)) throw new BadRequestException();
    const aux = new AsignaturaCarreraDto();
    aux.ID_carrera = carreraID;
    aux.posicion = ctaDTO.posicion;
    aux.semestre = ctaDTO.semestre;
    return this. asignaturaService.pushCarrera(ctaDTO.ID_asignatura, aux);
  }

  @Put(':carreraID/actualizar/asignatura/remove')
  putRemoveAsignaturaCarrera(
  @Param('carreraID', ParseIntPipe) carreraID: number,
  @Body() ctaDTO: CarreraAsignaturaDto){
    if(isNaN(carreraID)) throw new BadRequestException();
    const aux = new AsignaturaCarreraDto();
    aux.ID_carrera = carreraID;
    aux.posicion = ctaDTO.posicion;
    aux.semestre = ctaDTO.semestre;
    return this. asignaturaService.removeCarrera(ctaDTO.ID_asignatura, aux);
  }
}

/**
 * Carrera
 * get all 👍
 * get por id 👍
 * get por nombre 👍
 * get por facultad 👍 (queryBuilder capaz)
 * get asignaturas 👍
 * - get(carreraID/semestreID/) (por semestre)
 * - get(carreraID) (todas) (¿quitar de asignatura?)
 *
 * post nueva carrera 👍
 *
 * put asignatura 👍
 * put cualquier dato 👍
 * put actualizar matriculados
 *
 * delete softdelete 👍
 *
 * Plazo matricula ❔
 * Matricula ❔
 */
