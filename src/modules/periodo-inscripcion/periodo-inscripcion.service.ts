import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PeriodoInscripcionEntity } from './preiodo-inscripcion.entity';

@Injectable()
export class PeriodoInscripcionService {
    constructor(
        @InjectRepository(PeriodoInscripcionEntity)
        private readonly PeriodoRepo: Repository<PeriodoInscripcionEntity>,
    ) {}

    async dentroDelPeriodo(fecha:Date, periodoID: number): Promise<boolean>{
        const periodo = await this.PeriodoRepo.findOne({
            where: {ID_periodo: periodoID}
        });
        if (!periodo) throw new NotFoundException('Periodo de inscripción no encontrado');
        const ini = periodo.inicio;
        const fin = periodo.final;
        return (fecha < fin && fecha >= ini);
    }
}
