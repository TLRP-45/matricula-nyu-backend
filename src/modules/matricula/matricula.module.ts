import { Module } from '@nestjs/common';
import { MatriculaService } from './matricula.service';
import { MatriculaController } from './matricula.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [MatriculaService],
  controllers: [MatriculaController],
  exports: [TypeOrmModule, MatriculaService, MatriculaController]
})
export class MatriculaModule {}
