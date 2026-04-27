import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DesinscripcionController } from './desinscripcion/desinscripcion.controller';
import { DesincripcionService } from '../services/desincripcion/desincripcion.service';
import { EstudianteTomaOfertaEntity } from '../modules/estudiante/estudiante-toma-oferta.entity';
import { OfertaEntity } from '../modules/oferta/oferta.entity';
import { PeriodoInscripcionEntity } from '../modules/periodo-inscripcion/preiodo-inscripcion.entity';
import { EstudianteEntity } from '../modules/estudiante/estudiante.entity';
import { InscripcionesController } from './inscripcion/inscripciones.controller';
import { InscripcionesService } from '../services/inscripcion/inscripciones.service';
import { AsignaturaEntity } from '../modules/asignatura/asignatura.entity';
import { BloqueHorarioEntity } from '../modules/bloque-horario/bloque-horario.entity';
import { CarreraEntity } from '../modules/carrera/carrera.entity';
import { MatriculaEntity } from '../modules/matricula/matricula.entity';
import { CarreraTieneAsignaturaEntity } from '../modules/carrera/carrera-tiene-asignatura.entity';
import { ProfesorEntity } from '../modules/profesor/profesor.entity';
import { AsignaturaService } from '../modules/asignatura/asignatura.service';
import { BloqueHorarioService } from '../modules/bloque-horario/bloque-horario.service';
import { CarreraService } from '../modules/carrera/carrera.service';
import { EstudianteService } from '../modules/estudiante/estudiante.service';
import { MatriculaService } from '../modules/matricula/matricula.service';
import { OfertaService } from '../modules/oferta/oferta.service';
import { PeriodoInscripcionService } from '../modules/periodo-inscripcion/periodo-inscripcion.service';
import { ProfesorService } from '../modules/profesor/profesor.service';
import { PlazoMatricula } from '../modules/plazo-matricula/plazo-matricula.entity';
import { AutenticacionController } from './autenticacion/autenticacion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([
    AsignaturaEntity,
    BloqueHorarioEntity,
    CarreraEntity,
    EstudianteEntity,
    EstudianteTomaOfertaEntity,
    MatriculaEntity,
    CarreraTieneAsignaturaEntity,
    ProfesorEntity,
    OfertaEntity,
    PeriodoInscripcionEntity,
    PlazoMatricula,
    ])
  ],
  controllers: [
    DesinscripcionController,
    InscripcionesController,
    AutenticacionController],
  providers: [
    DesincripcionService,
    InscripcionesService,
    AsignaturaService,
    BloqueHorarioService,
    CarreraService,
    EstudianteService,
    MatriculaService,
    OfertaService,
    PeriodoInscripcionService,
    ProfesorService
    ],
  exports: [InscripcionesService, DesincripcionService]
  })
export class ControllersModule {}
