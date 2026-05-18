import { IsNotEmpty, IsString } from "class-validator";

export class RegistroDTO {
  @IsString()
  @IsNotEmpty()
  rut!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
