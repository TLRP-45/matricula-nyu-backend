import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatriculaEntity } from './matricula.entity';


@Injectable()
export class MatriculaService {
    constructor(
        @InjectRepository(MatriculaEntity)
        private readonly MatriculaRepo: Repository<MatriculaEntity>
    ){}

    async ultimaMatricula(estudianteId: number) {
        return this.MatriculaRepo
            .createQueryBuilder('matricula')
            .leftJoin('matricula.estudiante', 'estudiante')
            .where('estudiante.ID_estudiante = :id', { id: estudianteId })
            .orderBy('matricula.createdAt', 'DESC')
            .getOne();
    }
}
