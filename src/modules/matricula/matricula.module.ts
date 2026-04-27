import { Module } from '@nestjs/common';
import { MatriculaService } from './matricula.service';
import { MatriculaController } from './matricula.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatriculaEntity } from './matricula.entity';
import { CarreraEntity } from '../carrera/carrera.entity';
import { PlazoMatricula } from '../plazo-matricula/plazo-matricula.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MatriculaEntity,
      CarreraEntity,
      PlazoMatricula,
    ]),
  ],
  controllers: [MatriculaController],
  providers: [MatriculaService],
})
export class MatriculaModule {}
