import { Module, forwardRef } from '@nestjs/common';
import { BloqueHorarioController } from './bloque-horario.controller';
import { BloqueHorarioService } from './bloque-horario.service';
import { BloqueHorarioEntity } from './bloque-horario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlazoMatriculaModule } from '../plazo-matricula/plazo-matricula.module';
import { AsignaturaModule } from '../asignatura/asignatura.module';
import { CarreraModule } from '../carrera/carrera.module';
import { EstudianteModule } from '../usuario/usuario.module';
import { MatriculaModule } from '../matricula/matricula.module';
import { OfertaModule } from '../oferta/oferta.module';
import { PeriodoInscripcionModule } from '../periodo-inscripcion/periodo-inscripcion.module';
import { ProfesorModule } from '../profesor/profesor.module';

@Module({
  imports: [
      TypeOrmModule.forFeature([
        BloqueHorarioEntity
      ]),
      forwardRef(() =>PlazoMatriculaModule),
      forwardRef(() =>AsignaturaModule),
      forwardRef(() =>CarreraModule),
      forwardRef(() =>EstudianteModule),
      forwardRef(() =>MatriculaModule),
      forwardRef(() =>OfertaModule),
      forwardRef(() =>PeriodoInscripcionModule),
      forwardRef(() =>ProfesorModule),
  ],
  controllers: [BloqueHorarioController],
  providers: [BloqueHorarioService],
  exports: [BloqueHorarioService],
})
export class BloqueHorarioModule {}
