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

    /**
     * Retorna la instancia de la asignatura en la base de datos
     * buscándola por su ID
     *
     * @param id - número identificador de la asignatura
     * @returns AsignaturaEntity - la instancia de la asignatura
     * en la base de datos que coincide con el id dado
     * @throws NotFoundException - Si la asignatura con el id buscado
     * no es encontrada
     */
    async getAsignatura(id: number){
        const result = await this.AsignaturaRepo.findOneBy({
            ID_asignatura: id
        });
        if(!result)throw new NotFoundException('Asignatura no encontrada');
        return result;
    }

    /**
     * Busca las asignaturas respectivas de una carrera con un
     * QueryBuilder de TypeOrm
     *
     * @param carreraID - ID de la carrera. Es necesaria, ya que
     * no se puede devolver la totalidad de asignaturas (serían muchas)
     * @returns Promise<AsignaturaEntity[]> - Una lista de todas las asignaturas
     * que corresponden a la carrera
     * @throws NotFoundException - En caso de que no se encuentre ninguna
     * asignatura para el id de carrera dado
     */
    async getAsignaturasPorCarrera(carreraID: number) {
        const result = await this.AsignaturaRepo
            .createQueryBuilder('a')
            .leftJoin('a.es_de', 'cta')
            .leftJoin('cta.carrera', 'c')
            .where('c.id_carrera = :id', { id: carreraID })
            .getMany();
        if (!result)throw new NotFoundException('No se encontraron asignaturas para tal carrera.');
        return result;
    }

    /**
     * Obtiene todas las asignaturas de una carrera que sean del
     * semestre indicado
     * @param carreraID - El número de identificación de la carrera
     * @param semestre - el número del semestre solicitado
     * @returns Promise<CarreraTieneAsignaturaEntity[]> - un arreglo
     * de todas las asignaturas de ese semestre
     * @throws NotFoundException - Cuando no se encuentran asignaturas
     * para tal semestre o carrera
     */
    async getAsignaturasPorSemestre(carreraID: number, semestre: number) {
        const result = await this.CarreraTieneAsignaturaRepository
            .createQueryBuilder('cta')
            .leftJoinAndSelect('cta.asignatura', 'asignatura')
            .where('cta.carrera = :carreraId', { carreraID })
            .andWhere('cta.semestre = :semestre', { semestre })
            .getMany();
        if (!result)throw new NotFoundException('No se encontraron asignaturas hasta ese semestre.')
        return result;
    }

    /**
     * Obtiene el arreglo con todos los prerrequisitos directos a
     * la asignatura indicada por id
     * @param carreraID - Número identificador de la carrera
     * @param asignaturaID - Número identificador de la asignatura
     * @returns AsignaturaEntity[] - devuelve un arreglo de los
     * prerrequisitos de esa asignatura
     * @throws NotFoundException - si no se encuentran prerrequisitos para esa asignatura
     * no necesariamente es un error como por fallo de id de asignatura
     * sino que, puede suceder que la asignatura no tenga prerrequisitos
     */
    async getPrerrerequisitosPorCarrera(carreraID: number, asignaturaID:number){
        const result = await this.AsignaturaRepo
            .createQueryBuilder('a')
            .leftJoin('a.es_de', 'cta')
            .leftJoin('cta.carrera', 'c')
            .leftJoinAndSelect('a.prerrequisitos', 'p')
            .where('a.ID_asignatura = :asignaturaID', { asignaturaID })
            .andWhere('c.id = :carreraID', { carreraID })
            .getOne()
        if (!result)throw new NotFoundException('No se pudieron encontrar prerrequisitos para esta asignatura.')
        return result.prerrequisitos;
    }

    /**
     * Verifica si el estudiante dado cumple con los prerequisitos
     * para cierta asignatura
     *
     * @param estudianteID - Número de identificación de estudiante
     * @param asignaturaID - Número de identificación de asignatura
     * para ver si cumple los prerrequisitos de ésta
     * @returns true - si cumple con los prerrequisitos
     * @throws NotFoundException - Si no se encuentra estudiante
     * o asignatura por id
     * @throws BadRequestException - Si no cumple con algun prerrequisito
     * El primer prerrequisito encontrado sin cumplir será señalado
     * por el mensaje de error
     */
    async cumpleTodosLosPrerrequisitos(estudianteID: number, asignaturaID: number): Promise<boolean>{
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
}
