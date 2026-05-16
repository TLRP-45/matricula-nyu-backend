import { IsInt, IsString } from "class-validator";


export class CarreraUpdateDTO {
  @IsString()
  nombre?: string;

  @IsString()
  facultad?: string;

  @IsInt()
  duracion?: number;

  @IsInt()
  cupos?: number;
}
