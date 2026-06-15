import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfesorDto {
  @ApiProperty({
    example: 'Juan',
    description: 'Nombre del profesor',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  nombre!: string;

  @ApiProperty({
    example: 'Pérez',
    description: 'Apellido del profesor',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  apellido!: string;

  @ApiProperty({
    example: 'juan.perez@universidad.cl',
    description: 'Correo electrónico único del profesor',
    maxLength: 150,
  })
  @IsEmail()
  @IsNotEmpty()
  @Length(5, 150)
  email!: string;
}