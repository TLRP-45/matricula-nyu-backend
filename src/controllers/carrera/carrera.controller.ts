import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Carrera } from 'src/database/entities/carrera.entity';
import { CarreraService } from 'src/providers/carrera/carrera.service';
import { PostCarreraDTO } from './dto/post-carrera.dto';

@Controller('carrera')
export class CarreraController {
  constructor(private carreraService: CarreraService) {}

  @Get()
  getAllCarreras(): Promise<Carrera[]> {
    return this.carreraService.getAllCarreras();
  }

  @Get(':id')
  getCarrera(@Param('id') id: number): Promise<Carrera> {
    return this.carreraService.getCarrera(id);
  }

  @Post()
  crearCarrera(
    @Body() carrera: PostCarreraDTO,
  ) {
    this.carreraService.create(carrera);
  }
}
