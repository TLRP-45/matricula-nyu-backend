import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoreThan } from 'typeorm';

import { EstudianteEntity } from '../../modules/estudiante/estudiante.entity';
import { OfertaEntity } from '../../modules/oferta/oferta.entity';
import { PeriodoInscripcionEntity } from '../../modules/periodo-inscripcion/preiodo-inscripcion.entity';
import { EstudianteTomaOfertaEntity } from '../../modules/estudiante/estudiante-toma-oferta.entity';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { AsignaturaEntity } from '../../modules/asignatura/asignatura.entity';
import { MatriculaEntity } from '../../modules/matricula/matricula.entity';
import { OfertaService } from '../../modules/oferta/oferta.service';
import { AsignaturaService } from '../../modules/asignatura/asignatura.service';
import { PeriodoInscripcionService } from '../../modules/periodo-inscripcion/periodo-inscripcion.service';
import { EstudianteService } from '../../modules/estudiante/estudiante.service';
import { BloqueHorarioService } from '../../modules/bloque-horario/bloque-horario.service';

@Injectable()
export class InscripcionesService {
  constructor(
    @InjectRepository(EstudianteEntity)
    private readonly estudianteRepo: Repository<EstudianteEntity>,

    @InjectRepository(OfertaEntity)
    private readonly ofertaRepo: Repository<OfertaEntity>,

    @InjectRepository(PeriodoInscripcionEntity)
    private readonly PeriodoRepo: Repository<PeriodoInscripcionEntity>,

    @InjectRepository(EstudianteTomaOfertaEntity)
    private readonly TomaRepo: Repository<EstudianteTomaOfertaEntity>,

    @InjectRepository(AsignaturaEntity)
    private AsignaturaRepo: Repository<AsignaturaEntity>,

    @InjectRepository(MatriculaEntity)
    private MatriculaRepo: Repository<MatriculaEntity>,

    private readonly AsignaturaService: AsignaturaService,

    private readonly OfertaService: OfertaService,

    private readonly PeriodoService: PeriodoInscripcionService,

    private readonly EstudianteService: EstudianteService,

    private readonly BHorarioService: BloqueHorarioService
  ) {}

  /**
   * 
   * deuda: crear entidad matricula
   * prerrequisito: asignar prerre a ramos - buscar a qué ramo pertenece la oferta, tomar los prerre, buscar ofertas del usuario que sean de los ramos prerre y que el estado sea aprobado
   * cupos
   * periodo de inscripción
   * choque horario: validar... servicio bh?
   * 
   * actualiar cupos
   * hacer las relaciones nuevas
   */

  async inscribir(estudianteId: number, ofertaId: number) {

    //  Validar
    const estudiante = await this.estudianteRepo.findOne({
      where: { ID_estudiante: estudianteId },
      relations: ['toma'],
    });
    if (!estudiante)throw new NotFoundException('Estudiante no encontrado');

    const oferta = await this.ofertaRepo.findOne({
      where: { ID_oferta: ofertaId },
      relations: ['periodo_inscripcion', 'tomada', 'asignatura'],
    });
    if (!oferta)throw new NotFoundException('Oferta no encontrada');

    // Validar periodo de inscripción
    if (!this.PeriodoService.dentroDelPeriodo(new Date(), oferta.periodo_inscripcion.ID_periodo)){
      throw new BadRequestException('Fuera del periodo de inscripción')
    }

    // Validación de deuda
    const matricula = await this.MatriculaRepo.findOne({
      where: { estudiante: { ID_estudiante: estudiante.ID_estudiante } }
    });
    if (!matricula)throw new NotFoundException('Matricula no encontrada');

    if (!matricula.arancel_aldia)throw new BadRequestException('El estudiante tiene deuda pendiente');


    // Validación de Prerrequisitos
    if ( await !this.AsignaturaService.cumplePrerrequisitos(estudianteId, oferta.asignatura.ID_asignatura))throw new BadRequestException('No cumple con los prerrequisitos suficientes');

    //  Validación de cupos
    if ( await !this.OfertaService.cuposDisponibles(ofertaId))throw new BadRequestException('No hay cupos disponibles');

    //  Validar choque de horario
    const horarios = await this.EstudianteService.horarioPorEstudiante(estudianteId);
    if ( this.BHorarioService.detectarChoques(horarios)) throw new BadRequestException('Implica choque de horario');

    //  Guardar inscripción
    const inscripcion = this.TomaRepo.create({
      estudiante: estudiante,
      oferta: oferta,
      estado: 'inscrito',
      inscrita: new Date(),
    });

    await this.TomaRepo.save(inscripcion);

    await this.ofertaRepo.decrement(
      { ID_oferta: oferta.ID_oferta, cupos: MoreThan(0) },
      'cupos',
      1,
    );

    return {
      mensaje: 'Inscripción exitosa',
    };
  }
}