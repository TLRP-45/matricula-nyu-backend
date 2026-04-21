import { IsDate, IsBoolean } from "class-validator";

export class MatriculaDTO {
  @IsDate()
  fecha: Date;

  @IsBoolean()
  activa: boolean;

  carreraId: number;
}
