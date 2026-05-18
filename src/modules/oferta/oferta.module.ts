import { Module, forwardRef } from '@nestjs/common';
import { OfertaService } from './oferta.service';
import { OfertaController } from './oferta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfertaEntity } from './oferta.entity';
import { AsignaturaModule } from '../asignatura/asignatura.module';
import { BloqueHorarioModule } from '../bloque-horario/bloque-horario.module';
import { EstudianteModule } from '../estudiante/estudiante.module';
import { MatriculaModule } from '../matricula/matricula.module';
import { PeriodoInscripcionModule } from '../periodo-inscripcion/periodo-inscripcion.module';
import { PlazoMatriculaModule } from '../plazo-matricula/plazo-matricula.module';
import { ProfesorModule } from '../profesor/profesor.module';
import { CarreraModule } from '../carrera/carrera.module';
import { EstudianteTomaOfertaEntity } from '../estudiante/estudiante-toma-oferta.entity';


@Module({
  imports: [
      TypeOrmModule.forFeature([
        OfertaEntity,
        EstudianteTomaOfertaEntity
      ]),
      forwardRef(() =>PlazoMatriculaModule),
      forwardRef(() =>AsignaturaModule),
      forwardRef(() =>BloqueHorarioModule),
      forwardRef(() =>EstudianteModule),
      forwardRef(() =>MatriculaModule),
      forwardRef(() =>PeriodoInscripcionModule),
      forwardRef(() =>ProfesorModule),
      forwardRef(() =>CarreraModule)
    ],
  providers: [OfertaService],
  controllers: [OfertaController],
  exports: [OfertaService]
})
export class OfertaModule {}
