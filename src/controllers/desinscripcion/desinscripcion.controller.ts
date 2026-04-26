import { Controller, Post, Body, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DesincripcionService } from '../../services/desincripcion/desincripcion.service';
import { EstudianteTomaOfertaEntity } from '../../modules/estudiante/estudiante-toma-oferta.entity';

class DesinscripcionDto {
  ID_toma!: number;
}

@Controller('desinscripcion')
export class DesinscripcionController {
  constructor(
    private readonly desincripcionService: DesincripcionService,

     @InjectRepository(EstudianteTomaOfertaEntity)
    private readonly tomaRepo: Repository<EstudianteTomaOfertaEntity>,
  ) {}

  @Post()
  async desinscribir(@Body() dto: DesinscripcionDto) {
    console.log('Repo is from connection:', (this.tomaRepo.manager.connection.options as any).database);

    const toma = await this.tomaRepo.findOne({
      where: { ID_toma: dto.ID_toma },
      relations: ['estudiante', 'oferta'],
    });

    console.log('Resultado findOne:', toma);

    if (!toma) {
      throw new NotFoundException('Inscripción no encontrada');
    }

    const ok = await this.desincripcionService.Desinscribir(
      toma.estudiante,
      toma.oferta,
      toma.inscrita,
    );

    if (!ok) {
      throw new BadRequestException('No se pudo desinscribir');
    }

    return {
      message: 'Desinscripción realizada correctamente',
      estado: 'OK',
    };
  }
}