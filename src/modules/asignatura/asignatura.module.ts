import { Module } from '@nestjs/common';
import { AsignaturaController } from './asignatura.controller';
import { AsignaturaService } from './asignatura.service';
import { AsignaturaEntity } from './asignatura.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from '../estudiante/estudiante.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([
        AsignaturaEntity,
        UsuarioEntity
      ]),
    ],
  controllers: [AsignaturaController],
  providers: [AsignaturaService],
  exports: [TypeOrmModule, AsignaturaService, AsignaturaController],
})
export class AsignaturaModule {}
