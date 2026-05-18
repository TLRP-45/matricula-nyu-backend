import { Module } from '@nestjs/common';
import { OfertaService } from './oferta.service';
import { OfertaController } from './oferta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfertaEntity } from './oferta.entity';
import { EstudianteTomaOfertaEntity } from '../estudiante/estudiante-toma-oferta.entity';
import { CarreraEntity } from '../carrera/carrera.entity';
import { BloqueHorarioEntity } from '../bloque-horario/bloque-horario.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([
        OfertaEntity,
        EstudianteTomaOfertaEntity,
        CarreraEntity,
        BloqueHorarioEntity
      ])
    ],
  providers: [OfertaService],
  controllers: [OfertaController],
  exports: [TypeOrmModule, OfertaService]
})
export class OfertaModule {}
