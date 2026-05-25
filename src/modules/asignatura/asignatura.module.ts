import { Module, forwardRef } from '@nestjs/common';
import { AsignaturaController } from './asignatura.controller';
import { AsignaturaService } from './asignatura.service';
import { AsignaturaEntity } from './asignatura.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from '../estudiante/estudiante.entity';
import { PlazoMatriculaModule } from '../plazo-matricula/plazo-matricula.module';
import { BloqueHorarioModule } from '../bloque-horario/bloque-horario.module';
import { CarreraModule } from '../carrera/carrera.module';
import { EstudianteModule } from '../estudiante/estudiante.module';
import { MatriculaModule } from '../matricula/matricula.module';
import { OfertaModule } from '../oferta/oferta.module';
import { PeriodoInscripcionModule } from '../periodo-inscripcion/periodo-inscripcion.module';
import { EstudianteTomaOfertaEntity } from '../estudiante/estudiante-toma-oferta.entity';
import { ProfesorModule } from '../profesor/profesor.module';
import { CarreraTieneAsignaturaEntity } from '../carrera/carrera-tiene-asignatura.entity';
import { MatriculaEntity } from '../matricula/matricula.entity';
import { CarreraEntity } from '../carrera/carrera.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([
        AsignaturaEntity,
        UsuarioEntity,
        EstudianteTomaOfertaEntity,
        CarreraTieneAsignaturaEntity,
        MatriculaEntity,
        CarreraEntity
      ]),
      forwardRef(() =>PlazoMatriculaModule),
      forwardRef(() => BloqueHorarioModule),
      forwardRef(() =>CarreraModule),
      forwardRef(() =>EstudianteModule),
      forwardRef(() =>MatriculaModule),
      forwardRef(() =>OfertaModule),
      forwardRef(() =>PeriodoInscripcionModule),
      forwardRef(() =>ProfesorModule),
    ],
  controllers: [AsignaturaController],
  providers: [AsignaturaService],
  exports: [AsignaturaService],
})
export class AsignaturaModule {}
