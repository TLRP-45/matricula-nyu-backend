import { Module } from '@nestjs/common';
import { EstudianteController } from './estudiante.controller';
import { EstudianteService } from './estudiante.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteTomaOfertaEntity } from './estudiante-toma-oferta.entity';
import { EstudianteEntity } from './estudiante.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EstudianteTomaOfertaEntity,
      EstudianteEntity
    ])
  ],
  controllers: [EstudianteController],
  providers: [EstudianteService],
  exports: [TypeOrmModule]
})
export class EstudianteModule {}
