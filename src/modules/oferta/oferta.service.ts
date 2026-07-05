import {Injectable,NotFoundException,BadRequestException} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsignaturaEntity } from '../asignatura/asignatura.entity';
import { EstudianteTomaOfertaEntity } from '../usuario/estudiante-toma-oferta.entity';

import { OfertaEntity } from './oferta.entity';
import { CreateOfertaDTO } from './dto/create-oferta.dto';
import { UpdateOfertaDTO } from './dto/update-oferta.dto';
import { BloqueHorarioEntity } from '../bloque-horario/bloque-horario.entity';

@Injectable()
export class OfertaService {

  constructor(
    @InjectRepository(OfertaEntity)
    private readonly ofertaRepo: Repository<OfertaEntity>,

    @InjectRepository(BloqueHorarioEntity)
    private readonly horarioRepo: Repository<BloqueHorarioEntity>,
  ) {}


  private async validarChoques(
  carreraId: number,
  semestre: number,
  horarios: any[],
  ofertaId?: number,
) {

  const ofertas = await this.ofertaRepo.find({
    where: {
      carrera: {
        id_carrera: carreraId,
      } as any,
      semestre,
    },
    relations: ['horarios'],
  });

  for (const oferta of ofertas) {

    if (ofertaId && oferta.ID_oferta === ofertaId) {
      continue;
    }

    for (const horarioExistente of oferta.horarios) {

      for (const horarioNuevo of horarios) {

        const mismoHorario =
          horarioExistente.dia === horarioNuevo.dia &&
          horarioExistente.hora === horarioNuevo.hora;

        if (mismoHorario) {
          throw new BadRequestException(
            'Ya existe una oferta del mismo semestre en ese horario'
          );
        }

        const mismaSala =
          horarioExistente.dia === horarioNuevo.dia &&
          horarioExistente.hora === horarioNuevo.hora &&
          horarioExistente.lugar === horarioNuevo.lugar;

        if (mismaSala) {
          throw new BadRequestException(
            'La sala ya está ocupada'
          );
        }
      }
    }
  }
}

  // CREAR (permite incompleto)
async crearOferta(data: CreateOfertaDTO) {

  let horarios: BloqueHorarioEntity[] = [];

    if (data.horarios?.length) {
      horarios = data.horarios.map(h => {
        const bh = new BloqueHorarioEntity();
        bh.dia = h.dia;
        bh.hora = h.hora;
        bh.duracion = h.duracion;
        bh.lugar = h.lugar;
        return bh;
      });
    }

  const oferta = this.ofertaRepo.create({

    tipo: data.tipo,
    grupo: data.grupo,
    cupos: data.cupos,
    hrs_semanales: data.hrs_semanales,
    semestre: data.semestre,

    asignatura: {
      ID_asignatura: data.asignaturaId,
    } as any,

    carrera: {
      id_carrera: data.carreraId,
    } as any,

    periodo_inscripcion: {
      ID_periodo: data.periodoId,
    } as any,

    ...(data.profesorId && {
      profesor: {
        ID_profesor: data.profesorId,
      } as any,
    }),

    ...(horarios.length && {
      horarios,
    }),
  });

  return this.ofertaRepo.save(oferta);
}
  //  EDITAR
  async editarOferta(id: number, data: UpdateOfertaDTO) {

    const oferta = await this.ofertaRepo.findOne({
      where: { ID_oferta: id },
      relations: ['horarios','carrera']
    });

    if (!oferta) {
      throw new NotFoundException('Oferta no encontrada');
    }

    if (data.grupo !== undefined) oferta.grupo = data.grupo;
    if (data.tipo !== undefined) oferta.tipo = data.tipo;
    if (data.cupos !== undefined) oferta.cupos = data.cupos;
    if (data.hrs_semanales !== undefined) oferta.hrs_semanales = data.hrs_semanales;

    //  profesor opcional SIN null
    if (data.profesorId !== undefined) {
      if (data.profesorId) {
        oferta.profesor = { ID_profesor: data.profesorId } as any;
      } else {
        (oferta as any).profesor = undefined;
      }
    }

    if (data.horarios) {
      oferta.horarios = data.horarios.map(h => {
        const bh = new BloqueHorarioEntity();
        bh.dia = h.dia;
        bh.hora = h.hora;
        bh.duracion = h.duracion;
        bh.lugar = h.lugar;
        return bh;
      });
    }

    return this.ofertaRepo.save(oferta);
  }
}
  // PUBLICAR
  async publicarOferta(id: number) {

    const oferta = await this.ofertaRepo.findOne({
      where: { ID_oferta: id },
      relations: ['horarios', 'profesor']
    });

    if (!oferta) {
      throw new NotFoundException('Oferta no encontrada');
    }

    // Validacion
    if (!oferta.profesor) {
      throw new BadRequestException('Debe asignar profesor antes de publicar');
    }

    if (!oferta.grupo) {
      throw new BadRequestException('Debe asignar grupo');
    }

    if (!oferta.horarios?.length) {
      throw new BadRequestException('Debe asignar al menos un horario');
    }

    oferta.estado = 'PUBLICADA';

    return this.ofertaRepo.save(oferta);
  }

  // VER PUBLICADAS
  async obtenerPublicadas(carreraId: number, periodoId: number) {
    return this.ofertaRepo.find({
      where: {
        estado: 'PUBLICADA',
        carrera: { id_carrera: carreraId } as any,
        periodo_inscripcion: { ID_periodo: periodoId } as any
      },
      relations: ['asignatura', 'profesor', 'horarios']
    });
  }

  // CUPOS
  async cuposDisponibles(ofertaID: number): Promise<boolean> {
    const oferta = await this.ofertaRepo.findOne({
      where: { ID_oferta: ofertaID }
    });

    if (!oferta) {
      throw new NotFoundException('Oferta no encontrada');
    }

    return oferta.cupos > 0;
  }
}