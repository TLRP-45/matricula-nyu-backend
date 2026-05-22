import { Body, Controller, Post } from '@nestjs/common';
import { EstudianteService } from '../../modules/estudiante/estudiante.service';

import {
  IsEmail,
  IsString,
  Length,
  IsIn
} from 'class-validator';

class RegistroEstudianteDto {
    
    ID_carrera!: number;

    @IsString()
    @Length(2,100)
    nombre!: string;

    @IsString()
    @Length(2,100)
    apellido!: string;

    @IsEmail()
    email!: string;

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
