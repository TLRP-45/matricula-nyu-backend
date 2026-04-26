import { Module } from '@nestjs/common';
import { CarreraController } from './carrera.controller';
import { CarreraService } from './carrera.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarreraEntity } from './carrera.entity';
import { CarreraTieneAsignaturaEntity } from './carrera-tiene-asignatura.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([
        CarreraEntity,
        CarreraTieneAsignaturaEntity
      ])
    ],
  controllers: [CarreraController],
  providers: [CarreraService],
  exports: [TypeOrmModule]
})
export class CarreraModule {}
