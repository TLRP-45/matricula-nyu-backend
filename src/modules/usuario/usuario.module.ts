import { Module, forwardRef } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { EstudianteService } from './usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteTomaOfertaEntity } from './estudiante-toma-oferta.entity';
import { UsuarioEntity } from './usuario.entity';
import { AsignaturaModule } from '../asignatura/asignatura.module';
import { BloqueHorarioModule } from '../bloque-horario/bloque-horario.module';
import { MatriculaModule } from '../matricula/matricula.module';
import { OfertaModule } from '../oferta/oferta.module';
import { PeriodoInscripcionModule } from '../periodo-inscripcion/periodo-inscripcion.module';
import { PlazoMatriculaModule } from '../plazo-matricula/plazo-matricula.module';
import { ProfesorModule } from '../profesor/profesor.module';
import { CarreraModule } from '../carrera/carrera.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      EstudianteTomaOfertaEntity,
      UsuarioEntity
    ]),
    forwardRef(() =>PlazoMatriculaModule),
    forwardRef(() => AsignaturaModule),
    forwardRef(() => BloqueHorarioModule),
    forwardRef(() =>MatriculaModule),
    forwardRef(() =>OfertaModule),
    forwardRef(() =>PeriodoInscripcionModule),
    forwardRef(() =>ProfesorModule),
    forwardRef(() =>CarreraModule),
  ],
  controllers: [UsuarioController],
  providers: [EstudianteService],
  exports: [TypeOrmModule, EstudianteService]
})
export class EstudianteModule {}
