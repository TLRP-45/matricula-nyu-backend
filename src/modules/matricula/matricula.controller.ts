import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
  NotFoundException,
  ForbiddenException,
  UseGuards
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
  ApiBearerAuth,
} from '@nestjs/swagger';
import { MatriculaEntity } from './matricula.entity';
import { EstadoOMatricula } from './matricula-estado.enum';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { RolUsuario } from '../usuario/rol-usuario.enum';
import { EstadoMatriculaDTO } from './dto/estado.dto';

@ApiTags('Matrícula')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('matricula')
export class MatriculaController {
  constructor(private matriculaService: MatriculaService) { }

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
  @Roles(RolUsuario.Admin)
  @ApiOperation({ summary: 'Crear una nueva matrícula' })
  @ApiBody({ type: MatriculaDTO })
  @ApiResponse({
    status: 201,
    description: 'Matrícula creada exitosamente',
  })
  public postMatricula(@Body() matricula: MatriculaDTO) {
    return this.matriculaService.create(matricula);
  }

  @Post('test')
  @Roles(RolUsuario.Admin)
  @ApiOperation({ summary: 'TEST Crear una nueva matrícula' })
  @ApiBody({ type: MatriculaDTO })
  @ApiResponse({
    status: 201,
    description: 'Matrícula creada exitosamente',
  })
  public postMatriculaTest(@Body() matricula: MatriculaDTO) {
    return this.matriculaService.testCreate(matricula);
  }

  @Put(':id')
  @Roles(RolUsuario.Admin)
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
  @Roles(RolUsuario.Admin)
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

  @Post('estado')
  @ApiOperation({ summary: 'Obtener el estado de un estudiante con el RUT' })
  @ApiBody({ type: EstadoMatriculaDTO })
  @ApiResponse({
    status: 200,
    description: 'Matrícula y estudiante encontrados'
  })
  @ApiResponse({
    status: 404,
    description: 'Estudiante no encontrado'
  })
  async matriculaRut(@Body() rut: EstadoMatriculaDTO): Promise<{ activa: boolean }> {
    let estado: boolean;
    try {
      const matricula: MatriculaEntity = await this.matriculaService.getMatriculaRut(rut.rut);
      estado = matricula.estado == EstadoOMatricula.ACTIVA;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof ForbiddenException) {
        estado = false;
      } else {
        throw error;
      }
    }
    return {
      activa: estado,
    }
  }
}
