import { Module } from '@nestjs/common';
import { AsignaturaController } from './asignatura.controller';
import { AsignaturaService } from './asignatura.service';
import { AsignaturaEntity } from './asignatura.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
      TypeOrmModule.forFeature([
        AsignaturaEntity
      ])
    ],
  controllers: [AsignaturaController],
  providers: [AsignaturaService],
  exports: [TypeOrmModule],
})
export class AsignaturaModule {}
