import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutenticacionController } from './autenticacion.controller';
import { Usuario } from '../database/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [AutenticacionController],
})
export class AutenticacionModule {}
