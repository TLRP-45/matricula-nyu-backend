import { Module } from '@nestjs/common';
import { PeriodoInscripcionController } from './periodo-inscripcion.controller';
import { PeriodoInscripcionService } from './periodo-inscripcion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeriodoInscripcionEntity } from './preiodo-inscripcion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PeriodoInscripcionEntity
    ])
  ],
  controllers: [PeriodoInscripcionController],
  providers: [PeriodoInscripcionService],
  exports: [TypeOrmModule]
})
export class PeriodoInscripcionModule {}
