import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsInt,
  IsString,
  IsEnum,
  Min,
  IsArray,
} from 'class-validator';

export class UpdateOfertaDTO {
  @ApiPropertyOptional({
    description: 'ID del profesor',
    example: 10,
  })
  @IsOptional()
  @IsInt()
  profesorId?: number;

  @ApiPropertyOptional({
    description: 'Grupo de la oferta',
    example: 'A',
  })
  @IsOptional()
  @IsString()
  grupo?: string;

  @ApiPropertyOptional({
    description: 'Tipo de oferta',
    enum: ['C', 'T', 'L'],
    example: 'C',
  })
  @IsOptional()
  @IsEnum(['C', 'T', 'L'])
  tipo?: 'C' | 'T' | 'L';

  @ApiPropertyOptional({
    description: 'Cupos disponibles',
    example: 30,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  cupos?: number;

  @ApiPropertyOptional({
    description: 'Horas semanales',
    example: 4,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  hrs_semanales?: number;

  @ApiPropertyOptional({
    description: 'Horarios de la oferta',
  })
  @IsOptional()
  @IsArray()
  horarios?: {
    hora: string;
    duracion: number;
    lugar: string;
  }[];
}