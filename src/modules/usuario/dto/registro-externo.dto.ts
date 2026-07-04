import { IsNotEmpty, IsString } from 'class-validator';

export class RegistroUsuarioExternoDTO {

  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  apellido!: string;

  @IsString()
  @IsNotEmpty()
  correo!: string;

  @IsString()
  @IsNotEmpty()
  pass!: string;
}
