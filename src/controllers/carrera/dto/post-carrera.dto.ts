import { IsInt, IsNotEmpty, IsString } from "class-validator";


export class PostCarreraDTO {
  @IsNotEmpty()
  @IsString()
  nombre!: string;

  @IsNotEmpty()
  @IsString()
  facultad!: string;

  @IsNotEmpty()
  @IsInt()
  duracion!: number;

  @IsNotEmpty()
  @IsInt()
  cupos!: number;
}
