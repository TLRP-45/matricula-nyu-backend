import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarreraEntity } from './carrera.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { PostCarreraDTO } from '../../controllers/carrera/dto/post-carrera.dto';

@Injectable()
export class CarreraService {
    constructor(
    @InjectRepository(CarreraEntity) private readonly carreraRepository: Repository<CarreraEntity>,
    ) {}

    async getAllCarreras(): Promise<CarreraEntity[]> {
        const result = await this.carreraRepository.find();

        return result;
    }

    async getCarrera(id: number) {
        const result = await this.carreraRepository.findOneBy({
            id_carrera: id,
        });
        return result;
    }

    async create(carrera: PostCarreraDTO): Promise<CarreraEntity> {
        const result = this.carreraRepository.create(carrera);

        return this.carreraRepository.save(result);
    }
}
