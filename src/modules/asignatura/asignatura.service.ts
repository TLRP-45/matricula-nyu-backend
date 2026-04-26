import { Injectable } from '@nestjs/common';
import { EstudianteService } from '../estudiante/estudiante.service';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { AsignaturaEntity } from './asignatura.entity';
import { CarreraTieneAsignaturaEntity } from '../carrera/carrera-tiene-asignatura.entity';

@Injectable()
export class AsignaturaService {
    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepo: Repository<EstudianteEntity>,
        @InjectRepository(AsignaturaEntity)
        private AsignaturaRepo: Repository<AsignaturaEntity>,
        private readonly EstudianteService: EstudianteService,
        @InjectRepository(CarreraTieneAsignaturaEntity)
        private readonly CarreraTieneAsignaturaRepository: Repository<CarreraTieneAsignaturaEntity>
    ){}

    async cumplePrerrequisitos(estudianteID: number, asignaturaID: number): Promise<boolean>{
        const estudiante = await this.estudianteRepo.findOne({
            where: { ID_estudiante: estudianteID },
            relations: ['toma'],
        });
        if (!estudiante)throw new NotFoundException('Estudiante no encontrado');

        const asignatura = await this.AsignaturaRepo.findOne({
            where: { ID_asignatura: asignaturaID },
            relations: ['prerrequisitos'],
        });
        if (!asignatura)throw new NotFoundException('Asignatura no encontrada');

        const prerrequisitos = asignatura.prerrequisitos;
        for (const p of prerrequisitos){
            const tomas_del_ramo =await this.EstudianteService.buscarTomaPorAsignatura(p.ID_asignatura);
            const aprobados = tomas_del_ramo.filter(item => item.estado === 'aprobado');
            if (aprobados.length <= 0)throw new BadRequestException(
                `Debes aprobar ${p.nombre} antes de ${asignatura.nombre}`,
                );
        }
        return true;
    }

    async buscarAsignaturasHastaSemestre(carreraId: number, semestre: number) {
    return this.CarreraTieneAsignaturaRepository
        .createQueryBuilder('cta')
        .leftJoinAndSelect('cta.asignatura', 'asignatura')
        .where('cta.carrera = :carreraId', { carreraId })
        .andWhere('cta.semestre <= :semestre', { semestre })
        .getMany();
    }
}
