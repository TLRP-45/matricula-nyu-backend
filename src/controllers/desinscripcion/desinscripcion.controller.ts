import { Controller, Post, Body, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DesincripcionService } from '../../services/desincripcion/desincripcion.service';
import { EstudianteTomaOfertaEntity } from '../../modules/estudiante/estudiante-toma-oferta.entity';

class DesinscripcionDto {
  ID_toma!: number | number[];
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
    if (!Array.isArray(dto.ID_toma)) {
      return await this.desinscribirUnico(dto.ID_toma);
    } else {
      return Promise.all(
        dto.ID_toma.map(of =>
          this.desinscribirUnico(of)
        )
      );
    }
  }

  async desinscribirUnico(tomaID: number) {
    const toma = await this.tomaRepo.findOne({
      where: { ID_toma: tomaID },
      relations: ['estudiante', 'oferta'],
    });

    if (!toma) {
      throw new NotFoundException('Inscripción no encontrada');
    }

    const ok = await this.desincripcionService.Desinscribir(
      toma.estudiante.ID_estudiante,
      toma.oferta.ID_oferta,
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