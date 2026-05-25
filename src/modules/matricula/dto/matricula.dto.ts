import { IsDate, IsInt, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

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
    description: 'Estado de la matrícula (opcional). Ej: "ACTIVA", "INACTIVA", "PENDIENTE"',
    type: String,
    required: false,
    example: 'ACTIVA',
  })
  @IsString()
  @IsOptional()
  estado!: string;

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