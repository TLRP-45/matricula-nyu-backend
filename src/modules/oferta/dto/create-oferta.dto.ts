import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  IsEnum,
  Min,
  IsArray,
} from 'class-validator';

export class CreateOfertaDTO {
  @ApiProperty({
    description: 'ID de la asignatura',
    example: 1,
  })
  @IsInt()
  asignaturaId!: number;

  @ApiPropertyOptional({
    description: 'ID del profesor (opcional)',
    example: 10,
  })
  @IsOptional()
  @IsInt()
  profesorId?: number;

  @ApiProperty({
    description: 'ID de la carrera',
    example: 3,
  })
  @IsInt()
  carreraId!: number;

  @ApiPropertyOptional({
    description: 'Grupo de la oferta',
    example: 'A',
  })
  @IsOptional()
  @IsString()
  grupo?: string;

  @ApiProperty({
    description: 'Tipo de oferta',
    enum: ['C', 'T', 'L'],
    example: 'C',
  })
  @IsEnum(['C', 'T', 'L'])
  tipo!: 'C' | 'T' | 'L';

  @ApiProperty({
    description: 'Cupos disponibles',
    example: 30,
  })
  @IsInt()
  @Min(1)
  cupos!: number;

  @ApiProperty({
    description: 'Horas semanales',
    example: 4,
  })
  @IsInt()
  @Min(1)
  hrs_semanales!: number;

  @ApiProperty({
    description: 'ID del periodo',
    example: 2,
  })
  @IsInt()
  periodoId!: number;

  @ApiPropertyOptional({
    description: 'Horarios de la oferta',
  })
  @IsOptional()
  @IsArray()
  horarios?: {
    dia: string;
    hora: string;
    duracion: number;
    lugar: string;
  }[];
}