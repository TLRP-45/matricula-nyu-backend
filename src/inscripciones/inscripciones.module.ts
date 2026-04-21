import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InscripcionesService } from './inscripciones.service';
import { InscripcionesController } from './inscripciones.controller';

import { Usuario } from '../entities/usuario.entity';
import { Asignatura } from '../entities/asignatura.entity';
import { Inscripcion } from '../entities/inscripcion.entity';
import { Historial } from '../entities/historial.entity';
import { Prerrequisito } from '../entities/prerrequisito.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuario,
      Asignatura,
      Inscripcion,
      Historial,
      Prerrequisito,
    ]),
  ],
  providers: [InscripcionesService],
  controllers: [InscripcionesController],
})
export class InscripcionesModule {}