import { IsInt, IsOptional, IsPositive, IsString, Min, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AsignaturaCreateDto {

  @ApiProperty({
    description: 'Nombre de la asignatura',
    example: 'Programación I'
  })
  @IsString()
  nombre!: string;

  @ApiProperty({
    description: 'Cantidad de créditos asignados a la asignatura',
    example: 5,
    type: Number
  })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  creditos!: number;

  @ApiProperty({
    description: 'Carácter de la asignatura (ej: Obligatoria, Electiva)',
    example: 'Obligatoria'
  })
  @IsString()
  caracter!: string;

  @ApiProperty({
    description: 'Horas presenciales de la asignatura',
    example: 32,
    type: Number,
    minimum: 0
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  hrs_presenciales!: number;

  @ApiProperty({
    description: 'Horas de trabajo autónomo del estudiante',
    example: 48,
    type: Number,
    minimum: 0
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  hrs_autonomo!: number;
}