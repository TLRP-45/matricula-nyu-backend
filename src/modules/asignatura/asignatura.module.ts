import { Module } from '@nestjs/common';
import { AsignaturaController } from './asignatura.controller';
import { AsignaturaService } from './asignatura.service';
import { AsignaturaEntity } from './asignatura.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteService } from '../estudiante/estudiante.service';
import { EstudianteEntity } from '../estudiante/estudiante.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([
        AsignaturaEntity,
        EstudianteEntity
      ]),
      EstudianteService
    ],
  controllers: [AsignaturaController],
  providers: [AsignaturaService],
  exports: [TypeOrmModule, AsignaturaService, AsignaturaController],
})
export class AsignaturaModule {}
