import { IsDate, IsInt, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class MatriculaDTO {
  @Type(() => Date)
  @IsDate()
  fecha!: Date;

  @IsString()
  @IsOptional()
  estado!: string;

  @Type(() => Number)
  @IsInt()
  carreraId!: number;
}