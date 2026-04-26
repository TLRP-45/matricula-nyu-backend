import { Module } from '@nestjs/common';
import { OfertaService } from './oferta.service';
import { OfertaController } from './oferta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfertaEntity } from './oferta.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([
        OfertaEntity
      ])
    ],
  providers: [OfertaService],
  controllers: [OfertaController],
  exports: [TypeOrmModule]
})
export class OfertaModule {}
