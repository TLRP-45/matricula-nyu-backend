import {
  IsOptional, IsInt, IsString,
  IsEnum, Min, IsArray
} from 'class-validator';

export class UpdateOfertaDTO {

  @IsOptional()
  @IsInt()
  profesorId?: number;

  @IsOptional()
  @IsString()
  grupo?: string;

  @IsOptional()
  @IsEnum(['C', 'T', 'L'])
  tipo?: 'C' | 'T' | 'L';

  @IsOptional()
  @IsInt()
  @Min(1)
  cupos?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  hrs_semanales?: number;

  @IsOptional()
  @IsArray()
  horarios?: {
    hora: string;
    duracion: number;
    lugar: string;
  }[];
}