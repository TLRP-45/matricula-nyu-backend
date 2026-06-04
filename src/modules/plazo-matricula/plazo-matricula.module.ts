import { Module, forwardRef } from '@nestjs/common';
import { PlazoMatriculaService } from './plazo-matricula.service';
import { PlazoMatriculaController } from './plazo-matricula.controller';
import { PlazoMatricula } from './plazo-matricula.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsignaturaModule } from '../asignatura/asignatura.module';
import { BloqueHorarioModule } from '../bloque-horario/bloque-horario.module';
import { EstudianteModule } from '../usuario/usuario.module';
import { MatriculaModule } from '../matricula/matricula.module';
import { OfertaModule } from '../oferta/oferta.module';
import { PeriodoInscripcionModule } from '../periodo-inscripcion/periodo-inscripcion.module';
import { ProfesorModule } from '../profesor/profesor.module';
import { CarreraModule } from '../carrera/carrera.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlazoMatricula]),
    forwardRef(() =>AsignaturaModule),
    forwardRef(() =>BloqueHorarioModule),
    forwardRef(() =>EstudianteModule),
    forwardRef(() =>MatriculaModule),
    forwardRef(() =>OfertaModule),
    forwardRef(() =>PeriodoInscripcionModule),
    forwardRef(() =>ProfesorModule),
    forwardRef(() =>CarreraModule)
  ],
  providers: [PlazoMatriculaService],
  controllers: [PlazoMatriculaController],
  exports: [PlazoMatriculaService]
})
export class PlazoMatriculaModule {}
