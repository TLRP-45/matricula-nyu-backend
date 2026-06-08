import { Module, forwardRef } from '@nestjs/common';
import { PeriodoInscripcionController } from './periodo-inscripcion.controller';
import { PeriodoInscripcionService } from './periodo-inscripcion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeriodoInscripcionEntity } from './preiodo-inscripcion.entity';
import { PlazoMatriculaModule } from '../plazo-matricula/plazo-matricula.module';
import { BloqueHorarioModule } from '../bloque-horario/bloque-horario.module';
import { EstudianteModule } from '../usuario/usuario.module';
import { MatriculaModule } from '../matricula/matricula.module';
import { OfertaModule } from '../oferta/oferta.module';
import { ProfesorModule } from '../profesor/profesor.module';
import { CarreraModule } from '../carrera/carrera.module';
import { AsignaturaModule } from '../asignatura/asignatura.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PeriodoInscripcionEntity
    ]),
    forwardRef(() =>AsignaturaModule),
    forwardRef(() =>BloqueHorarioModule),
    forwardRef(() =>EstudianteModule),
    forwardRef(() =>MatriculaModule),
    forwardRef(() =>OfertaModule),
    forwardRef(() =>ProfesorModule),
    forwardRef(() =>CarreraModule),
    forwardRef(() =>PlazoMatriculaModule)
  ],
  controllers: [PeriodoInscripcionController],
  providers: [PeriodoInscripcionService],
  exports: [PeriodoInscripcionService]
})
export class PeriodoInscripcionModule {}
