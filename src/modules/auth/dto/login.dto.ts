import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  // @ApiProperty({
  //   description: 'RUT del usuario (formato 12345678-9)',
  //   example: '12345678-9',
  // })
  // @IsString()
  // @IsNotEmpty()
  // rut!: string;

  @ApiProperty({
    description: 'Correo del usuario',
    example: 'nombre@dominio.com'
  })
  @IsString()
  @IsNotEmpty()
  correo!: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: '1234',
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
