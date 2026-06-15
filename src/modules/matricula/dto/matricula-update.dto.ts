import { IsBoolean, IsDate, IsInt, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class MatriculaUpdateDTO {
  @ApiProperty({
    description: 'Semestre en el que se matricula',
    type: Number,
    required: false,
    example: 5
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  semestre?: number;

  @ApiProperty({
    description: 'Arancel al día',
    type: Boolean,
    required: false,
    example: 1
  })
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  arancel_aldia?: boolean;

  @ApiProperty({
    description: 'Estado actual de la matrícula (opcional). Ej: "ACTIVA", "RETIRADA", "SUSPENDIDA"',
    type: String,
    required: false,
    example: 'activa'
  })
  @IsString()
  @IsOptional()
  estado?: string;
}