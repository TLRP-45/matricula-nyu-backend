import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Matricula } from './entities/matricula.entity';
import { Carrera } from './entities/carrera.entity';
import { PlazoMatricula } from './entities/plazo-matricula.entity';
import { Estudiante } from './entities/estudiante.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Matricula,
      Carrera,
      PlazoMatricula,
      Estudiante,
    ])
  ],
})
export class DatabaseModule {}
