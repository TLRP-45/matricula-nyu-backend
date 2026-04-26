import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IMatriculaResponse } from './dto/IMatriculaResponse';
import { MatriculaService } from 'src/providers/matricula/matricula.service';
import { MatriculaDTO } from './dto/matricula.dto';
import { CarreraService } from 'src/providers/carrera/carrera.service';
import { readableStreamLikeToAsyncGenerator } from 'rxjs/internal/util/isReadableStreamLike';
import { MatriculaUpdateDTO } from './dto/matricula-update.dto';

@Controller('matricula')
export class MatriculaController {
  constructor(
    private matriculaService: MatriculaService,
    private carreraService: CarreraService,
  ) {}

  @Get()
  public getAllMatriculas() {
    this.matriculaService.getAllMatriculas();
  }

  @Get(':id')
  public getMatricula(@Param('id') id: number) {
    return this.matriculaService.getMatricula(id);
  }

  @Post()
  async postMatricula(
    @Body() matricula: MatriculaDTO,
  ) {
    try {
      return this.matriculaService.create(matricula);
    }
    catch(error: any) {
      return error
    }
  }

  @Put(':id')
  async updateMatricula(
    @Param('id') id: number,
    @Body() matricula: MatriculaUpdateDTO,
  ) {
    try {
      return this.matriculaService.update(id, matricula);
    }
    catch(error: any) {
      return error
    }
  }

  @Delete(':id')
  async deleteMatricula(
    @Param('id') id: number
  ) {
    try {
      return this.matriculaService.delete(id);
    }
    catch(error: any) {
      return error;
    }
  }
}
