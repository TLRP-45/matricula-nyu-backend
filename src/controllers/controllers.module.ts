import { Module } from '@nestjs/common';
import { MatriculaController } from './matricula/matricula.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Matricula } from 'src/database/entities/matricula.entity';
import { MatriculaService } from 'src/providers/matricula/matricula.service';
import { CarreraController } from './carrera/carrera.controller';
import { CarreraService } from 'src/providers/carrera/carrera.service';
import { Carrera } from 'src/database/entities/carrera.entity';
import { PlazoMatricula } from 'src/database/entities/plazo-matricula.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Matricula,Carrera,PlazoMatricula]),
  ],
  controllers: [
    MatriculaController,
    CarreraController,
  ],
  providers: [
    MatriculaService,
    CarreraService,
  ],
})
export class ControllersModule {}
