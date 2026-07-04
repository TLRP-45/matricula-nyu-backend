import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProfesorService } from './profesor.service';
import { ProfesorEntity } from './profesor.entity';
import { CreateProfesorDto } from './dto/profesor.dto';
import { UpdateProfesorDto } from './dto/profesor-update.dto';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { RolUsuario } from '../usuario/rol-usuario.enum';

@ApiTags('Profesores')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('profesores')
export class ProfesorController {
  constructor(
    private readonly profesorService: ProfesorService,
  ) { }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los profesores',
    description: 'Retorna la lista completa de profesores registrados.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de profesores obtenida correctamente.',
  })
  async getAll(): Promise<ProfesorEntity[]> {
    return this.profesorService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un profesor por ID',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del profesor',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Profesor encontrado.',
  })
  @ApiResponse({
    status: 404,
    description: 'Profesor no encontrado.',
  })
  async getOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProfesorEntity> {
    return this.profesorService.findOne(id);
  }

  @Post()
  @Roles(RolUsuario.Admin)
  @ApiOperation({
    summary: 'Crear un nuevo profesor',
  })
  @ApiResponse({
    status: 201,
    description: 'Profesor creado correctamente.',
  })
  create(
    @Body() createProfesorDto: CreateProfesorDto,
  ): Promise<ProfesorEntity> {
    return this.profesorService.create(createProfesorDto);
  }

  @Put(':id')
  @Roles(RolUsuario.Admin)
  @ApiOperation({
    summary: 'Actualizar un profesor',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfesorDto: UpdateProfesorDto,
  ): Promise<ProfesorEntity> {
    return this.profesorService.update(
      id,
      updateProfesorDto,
    );
  }

  @Delete(':id')
  @Roles(RolUsuario.Admin)
  @ApiOperation({
    summary: 'Eliminar un profesor',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Profesor eliminado correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Profesor no encontrado.',
  })
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.profesorService.remove(id);

    return {
      message: `Profesor con ID ${id} eliminado correctamente`,
    };
  }
}
