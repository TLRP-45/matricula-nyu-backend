import { Controller, Get, Param } from '@nestjs/common';
import { IMatriculaResponse } from './dto/IMatriculaResponse';

@Controller('matricula')
export class MatriculaController {

  private matriculas: IMatriculaResponse[] = [
    {
      fecha: new Date(),
      estado: true,
      id: 0
    },
    {
      fecha: new Date(),
      estado: false,
      id: 1
    }
  ]

  @Get()
  public getAllMatriculas() {
    return this.matriculas;
  }

  @Get(':id')
  public getMatricula(@Param('id') id: number) {
    const matricula = this.matriculas.find(m => m.id == id);

    return matricula;
  }
}
