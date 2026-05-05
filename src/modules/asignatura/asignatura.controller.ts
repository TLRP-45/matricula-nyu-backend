import { Controller, Get, NotFoundException, Param, ParseArrayPipe, ParseIntPipe } from '@nestjs/common';
import { AsignaturaService } from './asignatura.service';

@Controller('asignatura')
export class AsignaturaController {
    constructor(private asignaturaService: AsignaturaService){}

    @Get(':id')
    getAsignatura(@Param('id', ParseIntPipe) id: number){
        return this.asignaturaService.getAsignatura(id);
    }

    @Get(':carreraID/asignaturas/')
    getAsignaturasPorCarrera(@Param('carreraID', ParseIntPipe) carreraID: number){
        return this.asignaturaService.getAsignaturasPorCarrera(carreraID);
    }

    @Get(':carreraID/asignaturas/:asignaturaID')
    getPrerrerequisitosPorCarrera(
        @Param('carreraID', ParseArrayPipe) carreraID: number,
        @Param('asignaturaID', ParseIntPipe) asignaturaID: number){
        return this.asignaturaService.getPrerrerequisitosPorCarrera(carreraID, asignaturaID);
    }
}


/**
 * get por carrera/semestre (mejor en el otro ¿no?) 👍
 * get por id 👍
 * get prerre (de qué carrera?) 👍
 * get por nombre
 * 
 * HAY QUE PROBARLO❕❕
 *
 * post nueva asignatura
 *
 * put establecer prerre
 * put oferta (? creo que mejor en la misma oferta, pero porsiaca)
 *
 * delete softdelete
 */