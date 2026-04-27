import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe } from '@nestjs/common';
import { MatriculaDTO } from '../../controllers/matricula/dto/matricula.dto';
import { MatriculaUpdateDTO } from '../../controllers/matricula/dto/matricula-update.dto';
import { MatriculaService } from './matricula.service';

@Controller('matricula')
export class MatriculaController {
  constructor(
    private matriculaService: MatriculaService,
  ) {}

  @Get()
  public getAllMatriculas() {
    return this.matriculaService.getAllMatriculas();
  }

  @Get(':id')
  public getMatricula(@Param('id', ParseIntPipe) id: number) {
    return this.matriculaService.getMatricula(id);
  }

  @Post()
  async postMatricula(@Body() matricula: MatriculaDTO) {
    return this.matriculaService.create(matricula);
  }

  @Put(':id')
  async updateMatricula(
    @Param('id', ParseIntPipe) id: number,
    @Body() matricula: MatriculaUpdateDTO,
  ) {
    return this.matriculaService.update(id, matricula);
  }

  @Delete(':id')
  async deleteMatricula(@Param('id', ParseIntPipe) id: number) {
    return this.matriculaService.delete(id);
  }
}