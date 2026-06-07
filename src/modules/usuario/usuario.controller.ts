import { Controller,Get,Param } from '@nestjs/common';
import { EstudianteService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {

}

@Controller('estado-academico')
export class EstadoAcademicoController {

    constructor(
        private readonly estudianteService: EstudianteService
    ) {}

    @Get(':id')
    async obtenerEstado(
        @Param('id') id: number
    ) {
        return this.estudianteService.obtenerEstadoAcademico(id);
    }
}
