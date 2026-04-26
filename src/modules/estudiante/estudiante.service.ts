import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteTomaOfertaEntity } from './estudiante-toma-oferta.entity';
import { EstudianteEntity } from './estudiante.entity';
import { BloqueHorarioEntity } from '../bloque-horario/bloque-horario.entity';

@Injectable()
export class EstudianteService {
    constructor(
        @InjectRepository(EstudianteTomaOfertaEntity)
        private readonly TomaRepo: Repository<EstudianteTomaOfertaEntity>,
        @InjectRepository(EstudianteEntity)
        private readonly EstudianteRepo: Repository<EstudianteEntity>
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

}
