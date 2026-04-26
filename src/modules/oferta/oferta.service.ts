import { Injectable, NotFoundException } from '@nestjs/common';
import { OfertaEntity } from './oferta.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsignaturaEntity } from '../asignatura/asignatura.entity';
import { EstudianteTomaOfertaEntity } from '../estudiante/estudiante-toma-oferta.entity';

@Injectable()
export class OfertaService {
    constructor(
        @InjectRepository(OfertaEntity)
        private readonly ofertaRepo: Repository<OfertaEntity>,
        @InjectRepository(EstudianteTomaOfertaEntity)
            private readonly TomaRepo: Repository<EstudianteTomaOfertaEntity>,
    ){}

    async cuposDisponibles(ofertaID: number):Promise<boolean>{
        const oferta = await this.ofertaRepo.findOne({
            where: {ID_oferta: ofertaID}
        });
        if (!oferta)throw new NotFoundException('ID de oferta no encontrado');
        return oferta.cupos > 0;
    }

    async buscarOfertasPorAsignaturas(asignaturas: AsignaturaEntity[]) {
        const ids = asignaturas.map(a => a.ID_asignatura);

        return this.ofertaRepo
            .createQueryBuilder('oferta')
            .leftJoinAndSelect('oferta.asignatura', 'asignatura')
            .where('asignatura.ID_asignatura IN (:...ids)', { ids })
            .getMany();
    }

    async buscarOfertasNoTomadas(estudianteId: number) {
        return this.ofertaRepo
            .createQueryBuilder('oferta')
            .leftJoin(
            'oferta.tomada',
            'toma',
            'toma.estudiante = :estudianteId',
            { estudianteId }
            )
            .where('toma.ID_toma IS NULL')
            .getMany();
    }

    async buscarOfertasPorEstado(estudianteId: number, estados: string[]) {
        const tomas = await this.TomaRepo
            .createQueryBuilder('toma')
            .leftJoinAndSelect('toma.oferta', 'oferta')
            .where('toma.estudiante = :estudianteId', { estudianteId })
            .andWhere('toma.estado IN (:...estados)', { estados })
            .getMany();

        return tomas.map(t => t.oferta);
    }
}
