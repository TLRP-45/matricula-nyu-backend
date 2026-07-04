import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PrivateKeyDTO {
  @ApiProperty({
    description: 'Llave privada correspondiente al sistema',
    example: 'pk_sistema_XXXXXX',
  })
  @IsString()
  @IsNotEmpty()
  privateKey!: string;
}
