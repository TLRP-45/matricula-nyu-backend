import { Controller, Post, Body, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DesincripcionService } from '../../services/desincripcion/desincripcion.service';
import { EstudianteEntity } from '../../modules/estudiante/estudiante.entity';
import { OfertaEntity } from '../../modules/oferta/oferta.entity';

class DesinscripcionDto {
  ID_estudiante!: number;
  ID_oferta!: number;
  fecha!: Date;
}

@Controller('desinscripcion')
export class DesinscripcionController {
  constructor(
    private readonly desincripcionService: DesincripcionService,

    @InjectRepository(EstudianteEntity)
    private readonly estudianteRepo: Repository<EstudianteEntity>,

    @InjectRepository(OfertaEntity)
    private readonly ofertaRepo: Repository<OfertaEntity>,
  ) {}

  @Post()
  async desinscribir(@Body() dto: DesinscripcionDto) {
    const estudiante = await this.estudianteRepo.findOne({
      where: { ID_estudiante: dto.ID_estudiante },
      relations: ['toma'],
    });

    if (!estudiante) {
      throw new NotFoundException('Estudiante no encontrado');
    }

    const oferta = await this.ofertaRepo.findOne({
      where: { ID_oferta: dto.ID_oferta },
      relations: ['periodo_inscripcion', 'tomada'],
    });

    if (!oferta) {
      throw new NotFoundException('Oferta no encontrada');
    }

    const fecha = new Date(dto.fecha);

    const ok = await this.desincripcionService.Desinscribir(
      estudiante,
      oferta,
      fecha,
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