import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostCarreraDTO } from 'src/controllers/carrera/dto/post-carrera.dto';
import { Carrera } from 'src/database/entities/carrera.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarreraService {
  constructor(
    @InjectRepository(Carrera) private readonly carreraRepository: Repository<Carrera>,
  ) {}

  async getAllCarreras(): Promise<Carrera[]> {
    const result = await this.carreraRepository.find();

    return result;
  }

  async getCarrera(id: number): Promise<Carrera> {
    try {
      const result = this.carreraRepository.findOneByOrFail({ id: id });

      return result;
    }
    catch (error: any) {
      throw new NotFoundException('Carrera no encontrada');
    }
  }

  async create(carrera: PostCarreraDTO): Promise<Carrera> {
    const result = this.carreraRepository.create(carrera);

    return this.carreraRepository.save(result);
  }
}
