import { PartialType } from '@nestjs/swagger';
import { CreatePeriodoInscripcionDto } from './create-periodo-inscripcion.dto';

export class UpdatePeriodoInscripcionDto extends PartialType(
  CreatePeriodoInscripcionDto,
) {}