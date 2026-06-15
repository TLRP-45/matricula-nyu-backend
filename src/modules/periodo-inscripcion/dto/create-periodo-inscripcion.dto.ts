import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreatePeriodoInscripcionDto {
  @ApiProperty({
    description: 'Fecha y hora de inicio del período',
    example: '2026-07-01T08:00:00Z',
  })
  @IsDateString()
  @IsNotEmpty()
  inicio!: Date;

  @ApiProperty({
    description: 'Fecha y hora de término del período',
    example: '2026-07-15T23:59:59Z',
  })
  @IsDateString()
  @IsNotEmpty()
  final!: Date;
}