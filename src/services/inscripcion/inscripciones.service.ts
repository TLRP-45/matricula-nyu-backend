import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoreThan } from 'typeorm';

import { UsuarioEntity } from '../../modules/usuario/usuario.entity';
import { OfertaEntity } from '../../modules/oferta/oferta.entity';
import { PeriodoInscripcionEntity } from '../../modules/periodo-inscripcion/preiodo-inscripcion.entity';
import { EstudianteTomaOfertaEntity } from '../../modules/usuario/estudiante-toma-oferta.entity';
import { NotFoundException } from '@nestjs/common';
import { AsignaturaEntity } from '../../modules/asignatura/asignatura.entity';
import { MatriculaEntity } from '../../modules/matricula/matricula.entity';
import { OfertaService } from '../../modules/oferta/oferta.service';
import { AsignaturaService } from '../../modules/asignatura/asignatura.service';
import { PeriodoInscripcionService } from '../../modules/periodo-inscripcion/periodo-inscripcion.service';
import { EstudianteService } from '../../modules/usuario/usuario.service';
import { BloqueHorarioService } from '../../modules/bloque-horario/bloque-horario.service';
import { EstadoToma } from '../../modules/usuario/estado-toma.enum';

@Injectable()
export class InscripcionesService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly estudianteRepo: Repository<UsuarioEntity>,

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

  async inscribir(estudianteId: number, ofertaId: number) {

    //  Validar
    const estudiante = await this.estudianteRepo.findOne({
      where: { ID_estudiante: estudianteId },
      relations: ['toma'],
    });
    if (!estudiante)throw new NotFoundException('Estudiante no encontrado');

    const oferta = await this.ofertaRepo.findOne({
      where: { ID_oferta: ofertaId },
      relations: ['periodo_inscripcion', 'tomada', 'asignatura', 'carrera'],
    });
    if (!oferta)throw new NotFoundException('Oferta no encontrada');
    if (oferta.estado !== 'PUBLICADA')throw new BadRequestException('Oferta no publicada');

    // Validar periodo de inscripción
    if (!this.PeriodoService.dentroDelPeriodo(new Date(), oferta.periodo_inscripcion.ID_periodo)){
      throw new BadRequestException('Fuera del periodo de inscripción')
    }


    // Validar existencia
    const toma = await this.TomaRepo.findOne({
      where: {
        estudiante: {ID_estudiante: estudiante.ID_estudiante},
        estado: EstadoToma.INSCRITO,
        oferta: {ID_oferta: oferta.ID_oferta}
      }
    });
    //console.log(toma);
    if (toma)throw new BadRequestException('Ya inscrito');

    // Validación de deuda
    const matricula = await this.MatriculaRepo.findOne({
      where: { estudiante: { ID_estudiante: estudiante.ID_estudiante } },
      relations: ['carrera'],
    });
    if (!matricula)throw new NotFoundException('Matricula no encontrada');
    if (!matricula.arancel_aldia)throw new BadRequestException('El estudiante tiene deuda pendiente');
    // Validar carrera
    if(oferta.carrera.id_carrera !== matricula.carrera.id_carrera)throw new BadRequestException('Estudiante no matriculado a carrera de la oferta');


    // Validación de Prerrequisitos
    if ( await !this.AsignaturaService.cumpleTodosLosPrerrequisitos(estudianteId, oferta.asignatura.ID_asignatura))throw new BadRequestException('No cumple con los prerrequisitos suficientes');

    //  Validación de cupos
    if ( await !this.OfertaService.cuposDisponibles(ofertaId))throw new BadRequestException('No hay cupos disponibles');

    //  Validar choque de horario
    const horarios = await this.EstudianteService.horarioPorEstudiante(estudianteId);
    if ( this.BHorarioService.detectarChoques(horarios)) throw new BadRequestException('Implica choque de horario');

    //  Guardar inscripción
    const inscripcion = this.TomaRepo.create({
      estudiante: estudiante,
      oferta: oferta,
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
