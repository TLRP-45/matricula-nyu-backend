import { IsBoolean, IsDate, IsInt, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class MatriculaUpdateDTO {
  @ApiProperty({
    description: 'Fecha de actualización de la matrícula',
    type: String,
    format: 'date-time',
    required: false,
    example: '2024-03-15T10:30:00Z'
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  fecha?: Date;

  @ApiProperty({
    description: 'ID de la carrera a la que se desea cambiar la matrícula',
    type: Number,
    required: false,
    example: 5
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  carreraId?: number;

  @ApiProperty({
    description: 'Estado actual de la matrícula (opcional). Ej: "ACTIVA", "RETIRADA", "SUSPENDIDA"',
    type: String,
    required: false,
    example: 'ACTIVA'
  })
  @IsString()
  @IsOptional()
  estado?: string;
}