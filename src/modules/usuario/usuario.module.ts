import { Module } from '@nestjs/common';
import { EstudianteController } from './usuario.controller';
import { EstudianteService } from './usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteTomaOfertaEntity } from './estudiante-toma-oferta.entity';
import { UsuarioEntity } from './usuario.entity';
import { MatriculaEntity } from '../matricula/matricula.entity';
import { CarreraEntity } from '../carrera/carrera.entity';
import { CarreraTieneAsignaturaEntity } from '../carrera/carrera-tiene-asignatura.entity';
import { OfertaEntity } from '../oferta/oferta.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EstudianteTomaOfertaEntity,
      UsuarioEntity,
      MatriculaEntity,
      CarreraEntity,
      CarreraTieneAsignaturaEntity,
      OfertaEntity
    ])
  ],
  controllers: [EstudianteController],
  providers: [EstudianteService],
  exports: [TypeOrmModule, EstudianteService, EstudianteController]
})
export class EstudianteModule {}
