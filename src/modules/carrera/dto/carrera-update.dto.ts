import { IsInt, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CarreraUpdateDTO {
  @ApiPropertyOptional({
    description: 'Nuevo nombre de la carrera (opcional)',
    type: String,
    example: 'Ingeniería Civil Informática'
  })
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({
    description: 'Nueva facultad a la que pertenece la carrera (opcional)',
    type: String,
    example: 'Facultad de Ciencias de la Ingeniería'
  })
  @IsString()
  facultad?: string;

  @ApiPropertyOptional({
    description: 'Nueva duración de la carrera en semestres (opcional)',
    type: Number,
    example: 12
  })
  @IsInt()
  duracion?: number;

  @ApiPropertyOptional({
    description: 'Nuevo número de cupos disponibles (opcional)',
    type: Number,
    example: 150
  })
  @IsInt()
  cupos?: number;
}