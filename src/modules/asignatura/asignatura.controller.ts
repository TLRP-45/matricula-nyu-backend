import { Body, Controller, Get, Param, Post, ParseArrayPipe, ParseIntPipe, Delete } from '@nestjs/common';
import { AsignaturaService } from './asignatura.service';
import { AsignaturaCreateDto } from './dto/asignatura.dto';
import { AsignaturaEntity } from './asignatura.entity';

@Controller('asignaturas')
export class AsignaturaController {
    constructor(private asignaturaService: AsignaturaService){}

    @Get(':id')
    getAsignatura(@Param('id', ParseIntPipe) id: number){
        return this.asignaturaService.getAsignatura(id);
    }

    @Get(':carreraID')
    getAsignaturasPorCarrera(@Param('carreraID', ParseIntPipe) carreraID: number){
        return this.asignaturaService.getAsignaturasPorCarrera(carreraID);
    }

    @Get(':asignaturaID/prerrequisitos/:carreraID')
    getPrerrerequisitosPorCarrera(
        @Param('carreraID', ParseArrayPipe) carreraID: number,
        @Param('asignaturaID', ParseIntPipe) asignaturaID: number){
        return this.asignaturaService.getPrerrerequisitosPorCarrera(carreraID, asignaturaID);
    }

    @Get(':nombre')
    getPorNombre(@Param('nombre') nombre: string){
        return this.asignaturaService.getPorNombre(nombre);
    }

    @Get(':codigo')
    getPorCodigo(@Param('codigo') codigo: string){
        return this.asignaturaService.getPorNombre(codigo);
    }

    @Post()
    createAsignatura(@Body() dto: AsignaturaCreateDto): Promise<AsignaturaEntity>{
        return this.asignaturaService.create(dto);
    }

    @Delete(':id')
    deleteMatricula(@Param('id', ParseIntPipe) id: number) {
        return this.asignaturaService.delete(id);
    }
}


/**
 * get por carrera/semestre (mejor en el otro ¿no?) 👍
 * get por id 👍
 * get prerre (de qué carrera?) 👍
 * get por nombre 👍
 *
 * HAY QUE PROBARLO❕❕
 *
 * post nueva asignatura 👍
 *
 * put establecer prerre
 * put oferta (? creo que mejor en la misma oferta, pero porsiaca)
 * put carrera/s
 *
 * delete softdelete 👍
 */