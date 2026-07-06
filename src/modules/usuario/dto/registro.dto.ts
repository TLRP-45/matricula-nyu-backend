import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class RegistroUsuarioDTO {

  @ApiProperty({
    description: 'La ID de la carrera del usuario',
    example: 1,
  })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  ID_carrera!: number;

  @ApiProperty({
    description: 'El nombre del usuario',
    example: 'Juan',
  })
  @IsString()
  @Length(2, 100)
  @IsNotEmpty()
  nombre!: string;

  @ApiProperty({
    description: 'El apellido del usuario',
    example: 'Perez',
  })
  @IsString()
  @Length(2, 100)
  @IsNotEmpty()
  apellido!: string;

  @ApiProperty({
    description: 'El correo electrónico del usuario',
    example: 'nombre@dominio.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    description: 'El rol del usuario (admin o estudiante)',
    example: '1',
  })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  rol!: number;

  @ApiProperty({
    description: 'El RUT del usuario',
    example: '11111111-1',
  })
  @IsString()
  @IsNotEmpty()
  rut!: string;

  @ApiProperty({
    description: 'La nacionalidad del usuario',
    example: 'Chilena',
  })
  @IsString()
  @IsNotEmpty()
  nacionalidad!: string;

  @ApiProperty({
    description: 'El género del usuario',
    example: 'O',
  })
  @IsIn(['M', 'F', 'O'])
  @IsNotEmpty()
  sexo!: 'M' | 'F' | 'O';

  @ApiProperty({
    description: 'La fecha de nacimiento del usuario',
    example: '12-05-2000',
  })
  @IsString()
  @IsNotEmpty()
  nacimiento!: string;

  @ApiProperty({
    description: 'La dirección en la que vive el usuario',
    example: 'Calle Falsa 123',
  })
  @IsString()
  @IsNotEmpty()
  direccion!: string;

  @ApiProperty({
    description: 'El teléfono celular del usuario',
    example: '+56912345678',
  })
  @IsString()
  @IsNotEmpty()
  telefono!: string;

  @ApiProperty({
    description: 'La contraseña del usuario',
    example: 'juan123',
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
