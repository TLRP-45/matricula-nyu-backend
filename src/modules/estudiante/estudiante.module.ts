import { Module } from '@nestjs/common';
import { EstudianteController } from './estudiante.controller';
import { EstudianteService } from './estudiante.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteTomaOfertaEntity } from './estudiante-toma-oferta.entity';
import { UsuarioEntity } from './estudiante.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EstudianteTomaOfertaEntity,
      UsuarioEntity
    ])
  ],
  controllers: [EstudianteController],
  providers: [EstudianteService],
  exports: [TypeOrmModule, EstudianteService]
})
export class EstudianteModule {}
