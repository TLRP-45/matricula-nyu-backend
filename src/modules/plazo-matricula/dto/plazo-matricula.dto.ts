import { IsDate } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class PlazoMatriculaDTO {
  @ApiProperty({
    description: 'Fecha de inicio del plazo de matrícula',
    type: String,
    format: 'date-time',
    example: '2025-03-01T08:00:00.000Z'
  })
  @Type(() => Date)
  @IsDate()
  inicio!: Date;

  @ApiProperty({
    description: 'Fecha de término del plazo de matrícula',
    type: String,
    format: 'date-time',
    example: '2025-03-10T23:59:00.000Z'
  })
  @Type(() => Date)
  @IsDate()
  fin!: Date;
}