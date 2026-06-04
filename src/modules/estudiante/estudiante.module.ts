import { Module } from '@nestjs/common';
import { EstudianteController } from './estudiante.controller';
import { EstudianteService } from './estudiante.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteTomaOfertaEntity } from './estudiante-toma-oferta.entity';
import { EstudianteEntity } from './estudiante.entity';
import { MatriculaEntity } from '../matricula/matricula.entity';
import { CarreraEntity } from '../carrera/carrera.entity';
import { CarreraTieneAsignaturaEntity } from '../carrera/carrera-tiene-asignatura.entity';
import { OfertaEntity } from '../oferta/oferta.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EstudianteTomaOfertaEntity,
      EstudianteEntity,
      MatriculaEntity,
      CarreraEntity,
      CarreraTieneAsignaturaEntity,
      OfertaEntity
    ])
  ],
  controllers: [EstudianteController],
  providers: [EstudianteService],
  exports: [TypeOrmModule, EstudianteService, EstudianteController]
})
export class EstudianteModule {}
