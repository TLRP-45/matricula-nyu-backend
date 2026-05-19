import { Inject, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { MatriculaEntity } from './matricula.entity';
import { CarreraEntity } from '../carrera/carrera.entity';
import { PlazoMatricula } from '../plazo-matricula/plazo-matricula.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { MatriculaDTO } from './dto/matricula.dto';
import { MatriculaUpdateDTO } from './dto/matricula-update.dto';
import { CarreraService } from '../carrera/carrera.service';
import { PlazoMatriculaService } from '../plazo-matricula/plazo-matricula.service';
import { UsuarioEntity } from '../estudiante/estudiante.entity';

@Injectable()
export class MatriculaService {
    constructor(
        @InjectRepository(MatriculaEntity)
        private readonly MatriculaRepo: Repository<MatriculaEntity>,
        @InjectRepository(CarreraEntity)
        private readonly carreraRepository: Repository<CarreraEntity>,
        @InjectRepository(PlazoMatricula)
        private readonly plazoRepository: Repository<PlazoMatricula>,
        private carreraService: CarreraService,
        private plazoService: PlazoMatriculaService,
        @InjectRepository(UsuarioEntity)
        private readonly estudianteRepository: Repository<UsuarioEntity>,
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

    /**
     *
     * @param matricula
     * @returns
     * @description
     * 1. validar Plazo
     * 2. validar si pagado (integrar con sistema de pagos)
     * 3. validar carrera y cupos
     * 4. validar estudiante (debe crearse antes de la matricula)
     */
    public async create(matricula: MatriculaDTO): Promise<MatriculaEntity> {
        // mover la lógica de matricular para acá nomas
        // TODO: Integrar con el sistema de pagos, revisar si existe deuda
        // TODO: Definir bien cómo se designan los plazos
        // Revisar si se está dentro del plazo

        // Lógica en plazos

        //___________________________________________________
        const now = new Date();
        const plazo = await this.plazoService.getLastPlazo();
        if (!plazo)
            throw new NotFoundException('No existe un plazo definido para este proceso');

        if (!(now >= plazo.inicio && now <= plazo.fin))
            throw new UnauthorizedException('Proceso de matrícula fuera de plazo');

        //____________________________________________________

        // Espacio para lógica de arancel

        //____________________________________________________
        const carrera = await this.carreraService.getCarrera(matricula.ID_carrera);
        if(carrera.cupos < 1) throw new BadRequestException(`Cupos insuficientes (${carrera.cupos} cupos disponibles)`);

        //____________________________________________________
        // u otro metodo en el service
        const estudiante = await this.estudianteRepository.findOneBy({
            ID_estudiante: matricula.ID_estudiante
        });
        if(!estudiante)throw new NotFoundException('Estudiante no encontrado');

        //____________________________________________________

        const result = this.MatriculaRepo.create({
            semestre: matricula.semestre,
            carrera: carrera,
            estudiante: estudiante
        });

        const savedMatricula = await this.MatriculaRepo.save(result);

        carrera.matriculados = [...carrera.matriculados, savedMatricula];
        carrera.cupos -= 1;
        await this.carreraRepository.save(carrera);

        estudiante.matriculas = [...estudiante.matriculas, savedMatricula];
        await this.estudianteRepository.save(estudiante);

        return savedMatricula;
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
        // remover de carrera?
        // carrera.matriculados = carrera.matriculados.filter(m => !matriculas.includes(m));
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
