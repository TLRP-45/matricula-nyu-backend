import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteTomaOfertaEntity } from './estudiante-toma-oferta.entity';
import { UsuarioEntity } from './usuario.entity';
import { BloqueHorarioEntity } from '../bloque-horario/bloque-horario.entity';
import { EstadoToma } from './estado-toma.enum';

@Injectable()
export class EstudianteService {
    constructor(
        @InjectRepository(EstudianteTomaOfertaEntity)
        private readonly TomaRepo: Repository<EstudianteTomaOfertaEntity>,
        @InjectRepository(UsuarioEntity)
        private readonly EstudianteRepo: Repository<UsuarioEntity>
    ) {}

    async buscarTomaPorAsignatura(ID_asignatura: number){
        return this.TomaRepo
        .createQueryBuilder('toma')
        .leftJoinAndSelect('toma.oferta', 'oferta')
        .leftJoinAndSelect('oferta.asignatura', 'asignatura')
        .where('asignatura.ID_asignatura = :ID_asignatura', { ID_asignatura })
        .getMany();
    }

    // horario
    async horarioPorEstudiante(ID_estudiante: number): Promise<BloqueHorarioEntity[]>{
        const estudiante = await this.EstudianteRepo.findOne({
            where: { ID_estudiante },
            relations: [
                'toma',
                'toma.oferta',
                'toma.oferta.horarios'
            ]
        });
        if (!estudiante)throw new NotFoundException('Estudiante no encontrado');

        const ramos = estudiante.toma;
        if (!ramos)throw new InternalServerErrorException('Falla en la base de datos');

        const horarios = ramos.flatMap(r => r.oferta?.horarios ?? []);
        return horarios;
    }

    /**
   * Actualiza el estado de una inscripción de un estudiante en una oferta.
   *
   * Busca la toma mediante su identificador. Si no existe,
   * lanza una excepción NotFoundException.
   *
   * @param ID_toma Identificador de la toma de oferta.
   * @param estado Nuevo estado que tendrá la inscripción.
   * @returns La entidad actualizada.
   * @throws NotFoundException Si la toma no existe.
   */
  async cambiarEstado(ID_toma: number, estado: EstadoToma): Promise<EstudianteTomaOfertaEntity> {
    const toma = await this.TomaRepo.findOne({
      where: { ID_toma },
    });

    if (!toma) {
      throw new NotFoundException(
        `No existe una toma con ID ${ID_toma}`,
      );
    }

    toma.estado = estado;

    return this.TomaRepo.save(toma);
  }

}
