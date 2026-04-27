import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostCarreraDTO } from '../../controllers/carrera/dto/post-carrera.dto';
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
