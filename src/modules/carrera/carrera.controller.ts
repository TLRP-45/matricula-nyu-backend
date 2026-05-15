import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostCarreraDTO } from './dto/post-carrera.dto';
import { CarreraEntity } from './carrera.entity';
import { CarreraService } from './carrera.service';
import { ParseIntPipe } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

@Controller('carrera')
export class CarreraController {
  constructor(private carreraService: CarreraService) {}

  @Get()
  getAllCarreras(): Promise<CarreraEntity[]> {
    return this.carreraService.getAllCarreras();
  }

  @Get(':id')
  getCarrera(@Param('id', ParseIntPipe) id: number) {
      if (isNaN(id)) throw new BadRequestException();
      return this.carreraService.getCarrera(id);
  }

  @Post()
  async crearCarrera(
    @Body() carrera: PostCarreraDTO,
  ): Promise<CarreraEntity> {
    return await this.carreraService.create(carrera);
  }
}

/**
 * Carrera
 * get all 👍
 * get por id 👍
 * get por nombre 💤
 * get por código 💤
 * get por facultad 💤 (queryBuilder capaz)
 * get asignaturas 💤
 * - get(carreraID/semestreID/) (por semestre)
 * - get(carreraID) (todas) (¿quitar de asignatura?)
 *
 * post nueva carrera ❕
 *
 * put (modificar?) los cupos (¿Hacer derivado?)
 * put asignatura?
 * put cualquier dato ❕ A ASIGNATURA TAMBIÉN
 * put actualizar matriculados
 *
 * delete softdelete 💤
 *
 * put asignatura
 * atributo de posición en malla y semestre
 * a la relación entre carrera y asignatura
 *
 * Plazo matricula ❔
 * Matricula ❔
 */
