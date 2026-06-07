import { Body, Controller, Post } from '@nestjs/common';
import { EstudianteService } from '../../modules/estudiante/estudiante.service';
import { Type } from 'class-transformer';

import {
IsOptional,
  IsEmail,
  IsString,
  Length,
  IsIn,
  IsNumber
} from 'class-validator';

class RegistroEstudianteDto {
    
 @IsOptional()
@Type(() => Number)
@IsNumber()
ID_carrera?: number;

    @IsString()
    @Length(2,100)
    nombre!: string;

    @IsString()
    @Length(2,100)
    apellido!: string;

    @IsEmail()
    email!: string;

    @Type(() => Number)
    @IsNumber()
    rol!: number;

    @IsString()
    rut!: string;

    @IsString()
    nacionalidad!: string;

    @IsIn(['M','F','O'])
    sexo!: 'M' | 'F' | 'O';

    @IsString()
    nacimiento!: string;

    @IsString()
    direccion!: string;

    @IsString()
    telefono!: string;

    @IsString()
    password!: string;
}

@Controller('registrar-usuario')
export class RegistrarUsuarioController {

    constructor(
        private readonly estudianteService: EstudianteService
    ) {}

    @Post()
    async registrar(
        @Body() dto: RegistroEstudianteDto
    ) {
        return this.estudianteService.registrar(dto);
    }
}
