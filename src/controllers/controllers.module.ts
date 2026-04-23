import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DesinscripcionController } from './desinscripcion/desinscripcion.controller';
import { DesincripcionService } from '../services/desincripcion/desincripcion.service';
import { EstudianteTomaOfertaEntity } from '../modules/estudiante/estudiante-toma-oferta.entity';
import { OfertaEntity } from '../modules/oferta/oferta.entity';
import { PeriodoInscripcionEntity } from '../modules/periodo-inscripcion/preiodo-inscripcion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    EstudianteTomaOfertaEntity,
    OfertaEntity,
    PeriodoInscripcionEntity
  ])],
  controllers: [DesinscripcionController],
  providers: [DesincripcionService]
})
export class ControllersModule {}
