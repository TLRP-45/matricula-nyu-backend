import { Module, forwardRef } from '@nestjs/common';
import { MatriculaService } from './matricula.service';
import { MatriculaController } from './matricula.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatriculaEntity } from './matricula.entity';
import { CarreraEntity } from '../carrera/carrera.entity';
import { PlazoMatricula } from '../plazo-matricula/plazo-matricula.entity';
import { AsignaturaModule } from '../asignatura/asignatura.module';
import { BloqueHorarioModule } from '../bloque-horario/bloque-horario.module';
import { OfertaModule } from '../oferta/oferta.module';
import { PeriodoInscripcionModule } from '../periodo-inscripcion/periodo-inscripcion.module';
import { PlazoMatriculaModule } from '../plazo-matricula/plazo-matricula.module';
import { ProfesorModule } from '../profesor/profesor.module';
import { EstudianteModule } from '../usuario/usuario.module';
import { CarreraModule } from '../carrera/carrera.module';
import { UsuarioEntity } from '../usuario/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MatriculaEntity,
      CarreraEntity,
      PlazoMatricula,
      UsuarioEntity
    ]),
    forwardRef(() =>PlazoMatriculaModule),
    forwardRef(() =>AsignaturaModule),
    forwardRef(() =>BloqueHorarioModule),
    forwardRef(() =>EstudianteModule),
    forwardRef(() =>OfertaModule),
    forwardRef(() =>PeriodoInscripcionModule),
    forwardRef(() =>ProfesorModule),
    forwardRef(() =>CarreraModule),
  ],
  controllers: [MatriculaController],
  providers: [MatriculaService],
})
export class MatriculaModule {}
