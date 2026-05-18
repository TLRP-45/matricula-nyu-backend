import { PlazoMatriculaDTO } from './dto/plazo-matricula.dto';
import { PlazoMatriculaService } from './plazo-matricula.service';
import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe } from '@nestjs/common';

@Controller('plazo-matricula')
export class PlazoMatriculaController {
    constructor(
        private plazoService: PlazoMatriculaService,
    ){}

    @Get()
    public getAllPlazos(){
        return this.plazoService.getPlazos();
    }

    @Post()
    async postPlazo(@Body() plazo: PlazoMatriculaDTO){
        return this.plazoService.create(plazo);
    }
}
