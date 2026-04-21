import { IsBoolean, IsDate, IsInt, IsOptional } from "class-validator"

export class MatriculaUpdateDTO {
  @IsDate()
  @IsOptional()
  fecha: Date

  @IsBoolean()
  @IsOptional()
  activa: boolean

  @IsInt()
  @IsOptional()
  carreraId: number
}
