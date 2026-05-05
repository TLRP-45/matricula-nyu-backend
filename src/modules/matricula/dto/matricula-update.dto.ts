import { IsBoolean, IsDate, IsInt, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class MatriculaUpdateDTO {
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  fecha?: Date;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  carreraId?: number;

  @IsString()
  @IsOptional()
  estado?: string;
}