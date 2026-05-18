import { IsInt, IsOptional, IsPositive, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class AsignaturaPutDto {
  @ApiPropertyOptional({
    description: 'Nombre de la asignatura',
    example: 'Programación I',
  })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiPropertyOptional({
    description: 'Cantidad de créditos de la asignatura',
    example: 6,
  })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsOptional()
  creditos?: number;

  @ApiPropertyOptional({
    description: 'Carácter de la asignatura',
    example: 'Obligatoria',
  })
  @IsString()
  @IsOptional()
  caracter?: string;

  @ApiPropertyOptional({
    description: 'Horas presenciales',
    example: 32,
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  hrs_presenciales?: number;

  @ApiPropertyOptional({
    description: 'Horas autónomas',
    example: 64,
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  hrs_autonomo?: number;
}