import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegistroDTO {
  @ApiProperty({
    description: 'RUT del usuario (formato 12345678-9)',
    example: '12345678-9',
  })
  @IsString()
  @IsNotEmpty()
  rut!: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: '1234',
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}