import { Module } from '@nestjs/common';
import { PlazoMatriculaService } from './plazo-matricula.service';
import { PlazoMatriculaController } from './plazo-matricula.controller';
import { PlazoMatricula } from './plazo-matricula.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PlazoMatricula
    ])
  ],
  providers: [PlazoMatriculaService],
  controllers: [PlazoMatriculaController]
})
export class PlazoMatriculaModule {}
