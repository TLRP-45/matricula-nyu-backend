import { PlazoMatriculaDTO } from './dto/plazo-matricula.dto';
import { PlazoMatriculaService } from './plazo-matricula.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Plazo Matrícula')
@Controller('plazo-matricula')
export class PlazoMatriculaController {
    constructor(
        private plazoService: PlazoMatriculaService,
    ){}

    @Get()
    @ApiOperation({ summary: 'Obtener todos los plazos de matrícula' })
    @ApiResponse({ status: 200, description: 'Lista de plazos de matrícula obtenida correctamente' })
    public getAllPlazos() {
        return this.plazoService.getPlazos();
    }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo plazo de matrícula' })
    @ApiBody({
        type: PlazoMatriculaDTO,
        description: 'Datos necesarios para crear un plazo de matrícula'
    })
    @ApiResponse({ status: 201, description: 'Plazo de matrícula creado exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    async postPlazo(@Body() plazo: PlazoMatriculaDTO) {
        return this.plazoService.create(plazo);
    }
}