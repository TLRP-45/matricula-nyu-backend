import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { MatriculaEntity } from './matricula.entity';
import { CarreraEntity } from '../carrera/carrera.entity';
import { PlazoMatricula } from '../plazo-matricula/plazo-matricula.entity';
import { NotFoundException } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { MatriculaDTO } from '../../controllers/matricula/dto/matricula.dto';
import { MatriculaUpdateDTO } from '../../controllers/matricula/dto/matricula-update.dto';

@Injectable()
export class MatriculaService {
    constructor(
        @InjectRepository(MatriculaEntity)
        private readonly MatriculaRepo: Repository<MatriculaEntity>,
        @InjectRepository(CarreraEntity)
        private readonly carreraRepository: Repository<CarreraEntity>,
        @InjectRepository(PlazoMatricula)
        private readonly plazoRepository: Repository<PlazoMatricula>,

    ){}

    async ultimaMatricula(estudianteId: number) {
        return this.MatriculaRepo
            .createQueryBuilder('matricula')
            .leftJoin('matricula.estudiante', 'estudiante')
            .where('estudiante.ID_estudiante = :id', { id: estudianteId })
            .orderBy('matricula.createdAt', 'DESC')
            .getOne();
    }

    public async getAllMatriculas(): Promise<MatriculaEntity[]> {
        const result = await this.MatriculaRepo.find();

        return result;
      }

    public async getMatricula(id: number): Promise<MatriculaEntity> {
        try {
            const result = await this.MatriculaRepo.findOneByOrFail({ ID_matricula: id });

            return result;
        }
        catch (error: any) {
            throw new NotFoundException('Matrícula no encontrada');
        }
    }

    public async create(matricula: MatriculaDTO): Promise<MatriculaEntity> {
        // TODO: Integrar con el sistema de pagos, revisar si existe deuda
        // TODO: Definir bien cómo se designan los plazos
        // Revisar si se está dentro del plazo
        // const now = new Date();
        const plazo = await this.plazoRepository.findOneBy({ id: 1 });
        if (!plazo) {
        throw new NotFoundException('No existe un plazo definido para este proceso');
        }
        // console.log(now)
        // console.log(plazo)

        if (!(matricula.fecha >= plazo.inicio && matricula.fecha <= plazo.fin)) {
        throw new UnauthorizedException('Proceso de matrícula fuera de plazo');
        }

        // Buscar la carrera asociada
        const carrera = await this.carreraRepository.findOneBy({ id_carrera: matricula.carreraId });
        // const carrera = await this.carreraService.getCarrera(matricula.carreraId)

        if (!carrera) {
        throw new NotFoundException(`Carrera con id: ${matricula.carreraId} no encontrada`);
        }

        // TODO: Definir si cupos disponibles debe ser un atributo de carrera
        // Revisar si hay cupos disponibles
        const numeroMatriculados = await this.MatriculaRepo.count({
        where: { carrera: carrera }
        })

        if (numeroMatriculados >= carrera.cupos) {
            throw new UnauthorizedException('No existen cupos disponibles para esta carrera');
        }

        const carrera2 = await this.carreraRepository.findOneBy({
            id_carrera: matricula.carreraId
        });

        if (!carrera2) {
            throw new NotFoundException(`Carrera con id ${matricula.carreraId} no encontrada`);
        }

        const result = this.MatriculaRepo.create({
            estado: matricula.estado ?? 'activa',
            carrera: carrera2,
        });

        return await this.MatriculaRepo.save(result);
    }

    public async update(id: number, matricula: MatriculaUpdateDTO): Promise<UpdateResult> {
        const result: UpdateResult = await this.MatriculaRepo.update(id, matricula);

        if (result.affected == 0) {
          throw new NotFoundException('Matrícula no encontrada');
        }

        return result;
      }

      // Método que supongo útil para cancelar matrículas de estudiantes, sea por
      // expulsión o por término del período académico
      public async desactivar(id: number) {
        const matricula = await this.MatriculaRepo.findOneBy({ ID_matricula: id });

        if (!matricula) {
          throw new NotFoundException('Matrícula no encontrada');
        }

        matricula.estado = 'inactiva';

        this.MatriculaRepo.save(matricula);
      }

      public async delete(id: number) {
        const result = await this.MatriculaRepo.softDelete(id);

        if (result.affected == 0) {
          throw new NotFoundException('Matrícula no encontrada. No se hizo ningún cambio');
        }

        return result;
      }
}
