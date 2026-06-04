import { Module, forwardRef } from '@nestjs/common';
import { CarreraController } from './carrera.controller';
import { CarreraService } from './carrera.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarreraEntity } from './carrera.entity';
import { CarreraTieneAsignaturaEntity } from './carrera-tiene-asignatura.entity';
import { AsignaturaModule } from '../asignatura/asignatura.module';
import { BloqueHorarioModule } from '../bloque-horario/bloque-horario.module';
import { EstudianteModule } from '../usuario/usuario.module';
import { MatriculaModule } from '../matricula/matricula.module';
import { OfertaModule } from '../oferta/oferta.module';
import { PeriodoInscripcionModule } from '../periodo-inscripcion/periodo-inscripcion.module';
import { PlazoMatriculaModule } from '../plazo-matricula/plazo-matricula.module';
import { ProfesorModule } from '../profesor/profesor.module';
import { MatriculaEntity } from '../matricula/matricula.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([
        CarreraEntity,
        CarreraTieneAsignaturaEntity,
        MatriculaEntity
      ]),
      forwardRef(() =>PlazoMatriculaModule),
      forwardRef(() =>AsignaturaModule),
      forwardRef(() =>BloqueHorarioModule),
      forwardRef(() =>EstudianteModule),
      forwardRef(() =>MatriculaModule),
      forwardRef(() =>OfertaModule),
      forwardRef(() =>PeriodoInscripcionModule),
      forwardRef(() =>ProfesorModule),
    ],
    controllers: [CarreraController],
    providers: [CarreraService],
    exports: [CarreraService]
  })
export class CarreraModule {}
