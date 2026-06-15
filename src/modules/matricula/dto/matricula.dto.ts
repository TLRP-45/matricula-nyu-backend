import { IsDate, IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { EstadoOMatricula } from "../matricula-estado.enum";

export class MatriculaDTO {
  @ApiProperty({
    description: 'Semestre en el que se realiza la matrícula',
    type: Number,
    example: 1,
  })
  @Type(() => Number)
  @IsInt()
  semestre!: number;

  @ApiProperty({
    enum: EstadoOMatricula,
    example: EstadoOMatricula.ACTIVA,
  })
  @IsEnum(EstadoOMatricula)
  estado!: EstadoOMatricula;

  @ApiProperty({
    description: 'ID numérico de la carrera asociada a la matrícula',
    type: Number,
    example: 3,
  })
  @Type(() => Number)
  @IsInt()
  ID_carrera!: number;

  @ApiProperty({
    description: 'ID numérico del estudiante que realiza la matrícula',
    type: Number,
    example: 12,
  })
  @Type(() => Number)
  @IsInt()
  ID_estudiante!: number;
}