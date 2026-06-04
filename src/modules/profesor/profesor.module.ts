import { Module, forwardRef } from '@nestjs/common';
import { ProfesorController } from './profesor.controller';
import { ProfesorService } from './profesor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity';
import { PeriodoInscripcionModule } from '../periodo-inscripcion/periodo-inscripcion.module';
import { PlazoMatriculaModule } from '../plazo-matricula/plazo-matricula.module';
import { BloqueHorarioModule } from '../bloque-horario/bloque-horario.module';
import { CarreraModule } from '../carrera/carrera.module';
import { EstudianteModule } from '../usuario/usuario.module';
import { MatriculaModule } from '../matricula/matricula.module';
import { OfertaModule } from '../oferta/oferta.module';
import { AsignaturaModule } from '../asignatura/asignatura.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProfesorEntity
    ]),
    forwardRef(() =>AsignaturaModule),
    forwardRef(() =>BloqueHorarioModule),
    forwardRef(() =>EstudianteModule),
    forwardRef(() =>MatriculaModule),
    forwardRef(() =>OfertaModule),
    forwardRef(() =>PeriodoInscripcionModule),
    forwardRef(() =>CarreraModule),
    forwardRef(() =>PlazoMatriculaModule)
  ],
  controllers: [ProfesorController],
  providers: [ProfesorService],
  exports: [TypeOrmModule, ProfesorService]
})
export class ProfesorModule {}
