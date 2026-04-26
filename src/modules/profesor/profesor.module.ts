import { Module } from '@nestjs/common';
import { ProfesorController } from './profesor.controller';
import { ProfesorService } from './profesor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProfesorEntity
    ])
  ],
  controllers: [ProfesorController],
  providers: [ProfesorService],
  exports: [TypeOrmModule]
})
export class ProfesorModule {}
