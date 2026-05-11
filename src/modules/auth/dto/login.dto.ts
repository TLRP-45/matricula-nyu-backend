import { IsNotEmpty, IsString } from "class-validator";

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  rut!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
