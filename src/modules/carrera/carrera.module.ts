import { Module } from '@nestjs/common';
import { CarreraController } from './carrera.controller';
import { CarreraService } from './carrera.service';

@Module({
  controllers: [CarreraController],
  providers: [CarreraService]
})
export class CarreraModule {}
