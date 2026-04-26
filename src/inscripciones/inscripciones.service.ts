import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { Usuario } from '../entities/usuario.entity';
import { Asignatura } from '../entities/asignatura.entity';
import { Inscripcion } from '../entities/inscripcion.entity';
import { Historial } from '../entities/historial.entity';
import { Prerrequisito } from '../entities/prerrequisito.entity';

@Injectable()
export class InscripcionesService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,

    @InjectRepository(Asignatura)
    private asignaturaRepo: Repository<Asignatura>,

    @InjectRepository(Inscripcion)
    private inscripcionRepo: Repository<Inscripcion>,

    @InjectRepository(Historial)
    private historialRepo: Repository<Historial>,

    @InjectRepository(Prerrequisito)
    private prerreqRepo: Repository<Prerrequisito>,
  ) {}

  async inscribir(estudianteId: number, asignaturasIds: number[]) {

    //  Validar estudiante
    const estudiante = await this.usuarioRepo.findOne({
      where: { id: estudianteId },
    });

    if (!estudiante) {
      throw new BadRequestException('No existe estudiante');
    }

    if (estudiante.endeudado) {
      throw new BadRequestException('El estudiante tiene deuda pendiente');
    }

    //  Obtener asignaturas
    const asignaturas = await this.asignaturaRepo.find({
      where: { id: In(asignaturasIds) },
    });

    //  VALIDAR PRERREQUISITOS 
    for (const asignatura of asignaturas) {

      const requisitos = await this.prerreqRepo.find({
        where: { asignaturaId: asignatura.id },
      });

      for (const req of requisitos) {

        const aprobado = await this.historialRepo.findOne({
          where: {
            estudianteId,
            asignaturaId: req.requisitoId,
            aprobado: true,
          },
        });

        if (!aprobado) {

          //  Obtener nombre del prerequisito
          const asignaturaReq = await this.asignaturaRepo.findOne({
            where: { id: req.requisitoId },
          });

          throw new BadRequestException(
            `Debes aprobar ${asignaturaReq?.nombre} antes de ${asignatura.nombre}`,
          );
        }
      }
    }

    //  Validar cupos
    for (const asignatura of asignaturas) {
      if (asignatura.cuposDisponibles <= 0) {
        throw new BadRequestException(
          `No hay cupos en ${asignatura.nombre}`,
        );
      }
    }

    //  Validar choque de horario
    const horarios = asignaturas.map(a => a.horario);
    const set = new Set(horarios);

    if (set.size !== horarios.length) {
      throw new BadRequestException('Choque de horario');
    }

    //  Guardar inscripción
    for (const asignatura of asignaturas) {

      const existe = await this.inscripcionRepo.findOne({
        where: {
          estudianteId,
          asignaturaId: asignatura.id,
        },
      });

      if (existe) {
        throw new BadRequestException(
          `Ya estás inscrito en ${asignatura.nombre}`,
        );
      }

      await this.inscripcionRepo.save({
        estudianteId,
        asignaturaId: asignatura.id,
      });

      asignatura.cuposDisponibles -= 1;
      await this.asignaturaRepo.save(asignatura);
    }

    return {
      mensaje: 'Inscripción exitosa',
    };
  }
}