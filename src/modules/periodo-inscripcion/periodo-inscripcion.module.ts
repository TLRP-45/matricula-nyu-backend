import { Module } from '@nestjs/common';
import { PeriodoInscripcionController } from './periodo-inscripcion.controller';
import { PeriodoInscripcionService } from './periodo-inscripcion.service';

@Module({
  controllers: [PeriodoInscripcionController],
  providers: [PeriodoInscripcionService]
})
export class PeriodoInscripcionModule {}
