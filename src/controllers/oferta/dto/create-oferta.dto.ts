import {
  IsInt, IsOptional, IsString,
  IsEnum, Min, IsArray
} from 'class-validator';

export class CreateOfertaDTO {

  @IsInt()
  asignaturaId!: number;

  @IsOptional()
  @IsInt()
  profesorId?: number;

  @IsInt()
  carreraId!: number;

  @IsOptional()
  @IsString()
  grupo?: string;

  @IsEnum(['C', 'T', 'L'])
  tipo!: 'C' | 'T' | 'L';

  @IsInt()
  @Min(1)
  cupos!: number;

  @IsInt()
  @Min(1)
  hrs_semanales!: number;

  @IsInt()
  periodoId!: number;

  @IsOptional()
  @IsArray()
  horarios?: {
    hora: string;
    duracion: number;
    lugar: string;
  }[];
}