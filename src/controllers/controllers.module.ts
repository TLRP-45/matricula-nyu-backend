import { Module } from '@nestjs/common';
import { MatriculaController } from './matricula/matricula.controller';

@Module({
  controllers: [MatriculaController]
})
export class ControllersModule {}
