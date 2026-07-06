import { IsNotEmpty, IsString } from "class-validator";

export class EstadoMatriculaDTO {
  @IsString()
  @IsNotEmpty()
  rut!: string;
}
