import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { MatriculaDTO } from './dto/matricula.dto';
import { MatriculaUpdateDTO } from './dto/matricula-update.dto';
import { MatriculaService } from './matricula.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Matrícula')
@Controller('matricula')
export class MatriculaController {
  constructor(private matriculaService: MatriculaService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las matrículas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todas las matrículas registradas',
  })
  public getAllMatriculas() {
    return this.matriculaService.getAllMatriculas();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una matrícula por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Datos de la matrícula solicitada',
  })
  @ApiResponse({ status: 404, description: 'Matrícula no encontrada' })
  public getMatricula(@Param('id', ParseIntPipe) id: number) {
    return this.matriculaService.getMatricula(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva matrícula' })
  @ApiBody({ type: MatriculaDTO })
  @ApiResponse({
    status: 201,
    description: 'Matrícula creada exitosamente',
  })
  public postMatricula(@Body() matricula: MatriculaDTO) {
    return this.matriculaService.create(matricula);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una matrícula existente' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: MatriculaUpdateDTO })
  @ApiResponse({
    status: 200,
    description: 'Matrícula actualizada exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Matrícula no encontrada' })
  async updateMatricula(
    @Param('id', ParseIntPipe) id: number,
    @Body() matricula: MatriculaUpdateDTO,
  ) {
    return this.matriculaService.update(id, matricula);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una matrícula por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Matrícula eliminada exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Matrícula no encontrada' })
  async deleteMatricula(@Param('id', ParseIntPipe) id: number) {
    return this.matriculaService.delete(id);
  }
}