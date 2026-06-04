import { Module, forwardRef } from '@nestjs/common';
import { OfertaService } from './oferta.service';
import { OfertaController } from './oferta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfertaEntity } from './oferta.entity';
import { EstudianteTomaOfertaEntity } from '../usuario/estudiante-toma-oferta.entity';
import { CarreraEntity } from '../carrera/carrera.entity';
import { BloqueHorarioEntity } from '../bloque-horario/bloque-horario.entity';
import { AsignaturaModule } from '../asignatura/asignatura.module';
import { BloqueHorarioModule } from '../bloque-horario/bloque-horario.module';
import { EstudianteModule } from '../usuario/usuario.module';
import { MatriculaModule } from '../matricula/matricula.module';
import { PeriodoInscripcionModule } from '../periodo-inscripcion/periodo-inscripcion.module';
import { PlazoMatriculaModule } from '../plazo-matricula/plazo-matricula.module';
import { ProfesorModule } from '../profesor/profesor.module';
import { CarreraModule } from '../carrera/carrera.module';

@Module({
  imports: [
      TypeOrmModule.forFeature([
        OfertaEntity,
        EstudianteTomaOfertaEntity,
        CarreraEntity,
        BloqueHorarioEntity,
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
  exports: [TypeOrmModule, OfertaService]
})
export class OfertaModule {}
