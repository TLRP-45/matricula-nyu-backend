import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CarreraCreateDTO {
  @ApiProperty({
    description: 'Nombre completo de la carrera',
    type: String,
    example: 'Ingeniería en Informática'
  })
  @IsNotEmpty()
  @IsString()
  nombre!: string;

  @ApiProperty({
    description: 'Nombre de la facultad a la que pertenece la carrera',
    type: String,
    example: 'Facultad de Ingeniería'
  })
  @IsNotEmpty()
  @IsString()
  facultad!: string;

  @ApiProperty({
    description: 'Duración total de la carrera en semestres',
    type: Number,
    example: 10
  })
  @IsNotEmpty()
  @IsInt()
  duracion!: number;

  @ApiProperty({
    description: 'Cantidad de cupos disponibles para nuevos estudiantes',
    type: Number,
    example: 120
  })
  @IsNotEmpty()
  @IsInt()
  cupos!: number;
}