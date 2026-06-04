import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlazoMatricula } from './plazo-matricula.entity';
import { PlazoMatriculaDTO } from './dto/plazo-matricula.dto';

@Injectable()
export class PlazoMatriculaService {
    constructor(
        @InjectRepository(PlazoMatricula)
        private readonly plazoRepo: Repository<PlazoMatricula>,
    ){}

    async getPlazos(){
        const result = await this.plazoRepo.find();
        if(!result)throw new NotFoundException('Plazos no encontrados');
        return result;
    }

    async getLastPlazo(){
        const result = await this.plazoRepo.findOne({order:{id:'DESC'}});
        if(!result)throw new NotFoundException('Plazos no encontrados');
        return result;
    }

    create(plazo: PlazoMatriculaDTO): Promise<PlazoMatricula>{
        const result = this.plazoRepo.create(plazo);
        return this.plazoRepo.save(result);
    }
}
