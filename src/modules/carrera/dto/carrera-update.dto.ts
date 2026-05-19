import { IsInt, IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CarreraUpdateDTO {
  @ApiPropertyOptional({
    description: 'Nuevo nombre de la carrera (opcional)',
    type: String,
    example: 'Ingeniería Civil Informática'
  })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({
    description: 'Nueva facultad a la que pertenece la carrera (opcional)',
    type: String,
    example: 'Facultad de Ciencias de la Ingeniería'
  })
  @IsOptional()
  @IsString()
  facultad?: string;

  @ApiPropertyOptional({
    description: 'Nueva duración de la carrera en semestres (opcional)',
    type: Number,
    example: 12
  })
  @IsOptional()
  @IsInt()
  duracion?: number;

  @ApiPropertyOptional({
    description: 'Nuevo número de cupos disponibles (opcional)',
    type: Number,
    example: 150
  })
  @IsOptional()
  @IsInt()
  cupos?: number;
}