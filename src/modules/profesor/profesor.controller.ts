import {
Body,
Controller,
Delete,
Get,
Param,
ParseIntPipe,
Post,
Put,
} from '@nestjs/common';
import {
ApiTags,
ApiOperation,
ApiResponse,
ApiParam,
ApiBody,
} from '@nestjs/swagger';
import { ProfesorService } from './profesor.service';
import { ProfesorEntity } from './profesor.entity';
import { CreateProfesorDto } from './dto/profesor.dto';
import { UpdateProfesorDto } from './dto/profesor-update.dto';

@ApiTags('Profesores')
@Controller('profesores')
export class ProfesorController {
    constructor(
    private readonly profesorService: ProfesorService,
    ) {}

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