import { Body, Controller, Get, Param, Post, ParseArrayPipe, ParseIntPipe, Delete, Put, BadRequestException } from '@nestjs/common';
import { AsignaturaService } from './asignatura.service';
import { AsignaturaCreateDto } from './dto/asignatura.dto';
import { AsignaturaEntity } from './asignatura.entity';
import { IsArray, IsInt, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';

export class AsignaturaPrerrequisitosDto {
  @IsArray()
  @IsInt({each:true})
  @Type(()=> Number)
  ID_prerrequisitos!: number[];
}

@Controller('asignaturas')
export class AsignaturaController {
    constructor(private asignaturaService: AsignaturaService){}

    @Get(':id')
    getAsignatura(@Param('id', ParseIntPipe) id: number){
        if (isNaN(id)) throw new BadRequestException();
        return this.asignaturaService.getAsignatura(id);
    }

    @Get(':carreraID')
    getAsignaturasPorCarrera(@Param('carreraID', ParseIntPipe) carreraID: number){
        if (isNaN(carreraID)) throw new BadRequestException();
        return this.asignaturaService.getAsignaturasPorCarrera(carreraID);
    }

    @Get(':asignaturaID/prerrequisitos/:carreraID')
    getPrerrerequisitosPorCarrera(
    @Param('carreraID', ParseArrayPipe) carreraID: number,
    @Param('asignaturaID', ParseIntPipe) asignaturaID: number){
        if (isNaN(carreraID)) throw new BadRequestException();
        if (isNaN(asignaturaID)) throw new BadRequestException();
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
        if (isNaN(id)) throw new BadRequestException();
        return this.asignaturaService.delete(id);
    }

    @Put(':asignaturaID/prerrequisitos/push/')
    putPushPrerrequisitos(
    @Param('asignaturaID', ParseIntPipe) asignaturaID: number,
    @Body() prerres: AsignaturaPrerrequisitosDto){
        if (isNaN(asignaturaID)) throw new BadRequestException();
        return this.asignaturaService.pushPrerrequisito(asignaturaID, prerres);
    }

    @Put(':asignaturaID/prerrequisitos/replace/')
    putReplacePrerrequisitos(
    @Param('asignaturaID', ParseIntPipe) asignaturaID: number,
    @Body() prerreID: AsignaturaPrerrequisitosDto){
        if (isNaN(asignaturaID)) throw new BadRequestException();
        return this.asignaturaService.replacePrerrequisito(asignaturaID, prerreID);
    }

    @Put(':asignaturaID/prerrequisitos/remove/')
    putRemovePrerrequisitos(
    @Param('asignaturaID', ParseIntPipe) asignaturaID: number,
    @Body() prerreID: AsignaturaPrerrequisitosDto){
        if (isNaN(asignaturaID)) throw new BadRequestException();
        return this.asignaturaService.removePrerrequisito(asignaturaID, prerreID);
    }
}