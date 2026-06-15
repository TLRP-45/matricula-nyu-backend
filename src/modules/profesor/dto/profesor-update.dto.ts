import { PartialType } from '@nestjs/swagger';
import { CreateProfesorDto } from './profesor.dto';

export class UpdateProfesorDto extends PartialType(
  CreateProfesorDto,
) {}