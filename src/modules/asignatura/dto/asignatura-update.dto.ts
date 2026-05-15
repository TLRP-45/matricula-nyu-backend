import { IsInt, IsOptional, IsPositive, IsString, Min, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class AsignaturaPutDto {
  @IsString()
  nombre?: string;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  creditos?: number;

  @IsString()
  caracter?: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  hrs_presenciales?: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  hrs_autonomo?: number;
}