import { Module } from '@nestjs/common';
import { BloqueHorarioController } from './bloque-horario.controller';
import { BloqueHorarioService } from './bloque-horario.service';

@Module({
  controllers: [BloqueHorarioController],
  providers: [BloqueHorarioService]
})
export class BloqueHorarioModule {}
