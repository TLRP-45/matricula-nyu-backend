import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostCarreraDTO } from './dto/post-carrera.dto';
import { CarreraEntity } from './carrera.entity';
import { CarreraService } from './carrera.service';
import { ParseIntPipe } from '@nestjs/common';

@Controller('carrera')
export class CarreraController {
  constructor(private carreraService: CarreraService) {}

  @Get()
  getAllCarreras(): Promise<CarreraEntity[]> {
    return this.carreraService.getAllCarreras();
  }

  @Get(':id')
  getCarrera(@Param('id', ParseIntPipe) id: number) {
      console.log('ID recibido:', id);
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
 * get por nombre
 * get por código
 * get por facultad
 *
 * post nueva carrera
 *
 * put (modificar?) los cupos (¿Hacer derivado?)
 * put asignatura?
 * put cualquier dato
 * put actualizar matriculados
 *
 * delete softdelete
 *
 * crear asignaturas tomar asignaturas y asignarlas
 * en asignatura, cambiar el atributo de posición en malla
 * a la relación entre carrera y asignatura (que tenga semestre y posición en malla)
 *
 * get asignaturas (desde carrera, separadas por semestre)
 * o no sé, algo listo para mostrar
 * Tal vez, consultar carrera, luego qué semestre, y colocar las asignaturas
 *
 * validación de datos: check, pipes, dto
 */
