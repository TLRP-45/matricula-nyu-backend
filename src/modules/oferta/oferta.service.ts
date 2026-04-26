import { Injectable, NotFoundException } from '@nestjs/common';
import { OfertaEntity } from './oferta.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OfertaService {
    constructor(
        @InjectRepository(OfertaEntity)
        private readonly ofertaRepo: Repository<OfertaEntity>
    ){}

    async cuposDisponibles(ofertaID: number):Promise<boolean>{
        const oferta = await this.ofertaRepo.findOne({
            where: {ID_oferta: ofertaID}
        });
        if (!oferta)throw new NotFoundException('ID de oferta no encontrado');
        return oferta.cupos > 0;
    }
}
