import { Module } from '@nestjs/common';
import { BloqueHorarioController } from './bloque-horario.controller';
import { BloqueHorarioService } from './bloque-horario.service';
import { BloqueHorarioEntity } from './bloque-horario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
      TypeOrmModule.forFeature([
        BloqueHorarioEntity
      ])
    ],
  controllers: [BloqueHorarioController],
  providers: [BloqueHorarioService],
  exports: [TypeOrmModule],
})
export class BloqueHorarioModule {}
