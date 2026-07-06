import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { MatriculaEntity } from './matricula.entity';
import { CarreraEntity } from '../carrera/carrera.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { MatriculaDTO } from './dto/matricula.dto';
import { MatriculaUpdateDTO } from './dto/matricula-update.dto';
import { CarreraService } from '../carrera/carrera.service';
import { PlazoMatriculaService } from '../plazo-matricula/plazo-matricula.service';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { EstadoOMatricula } from './matricula-estado.enum';

@Injectable()
export class MatriculaService {
    constructor(
        @InjectRepository(MatriculaEntity)
        private readonly MatriculaRepo: Repository<MatriculaEntity>,
        @InjectRepository(CarreraEntity)
        private readonly carreraRepository: Repository<CarreraEntity>,
        private carreraService: CarreraService,
        private plazoService: PlazoMatriculaService,
        @InjectRepository(UsuarioEntity)
        private readonly estudianteRepository: Repository<UsuarioEntity>,
    ){}

    /**
     * Entrega la matrícula más reciente del estudiante.
     *
     * @param estudianteId El ID del estudiante
     * @returns La matrícula más reciente
     */
    async ultimaMatricula(estudianteId: number) {
        return this.MatriculaRepo
            .createQueryBuilder('matricula')
            .leftJoin('matricula.estudiante', 'estudiante')
            .where('estudiante.ID_estudiante = :id', { id: estudianteId })
            .orderBy('matricula.createdAt', 'DESC')
            .getOne();
    }

    /**
     * Entrega un arreglo con todas las matrículas registradas.
     *
     * @returns Arreglo de matrículas
     */
    public async getAllMatriculas(): Promise<MatriculaEntity[]> {
        const result = await this.MatriculaRepo.find();
        return result;
      }

    /**
     * Entrega una matrícula dada su ID.
     *
     * @param id El ID de la matrícula
     * @returs La matrícula
     *
     * @throws NotFoundException Si la matrícula no existe
     */
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
     * Crea y guarda una matrícula en la base de datos.
     *
     * @param matricula El DTO de matrícula con todos sus datos
     * @returns El objeto matrícula creado
     *
     * @throws NotFoundException Si no existe plazo de inscripción de matrícula
     * @throws UnauthorizedException Si se está fuera de plazo para la inscripción
     * @throws BadRequestException Si no hay cupos suficientes
     * @throws NotFoundException Si el estudiante no existe
     */
    public async create(matricula: MatriculaDTO): Promise<MatriculaEntity> {
        // mover la lógica de matricular para acá nomas
        // TODO: Integrar con el sistema de pagos, revisar si existe deuda
        // TODO: Definir bien cómo se designan los plazos
        // TODO: Verificar que no haya otra matricula igual activa
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

        carrera.cupos -= 1;
        await this.carreraRepository.save(carrera);

        return savedMatricula;
    }

    /**
     * Actualiza los datos de una matrícula.
     *
     * @param id El ID de la matrícula a modificar
     * @param matricula El objeto matrícula con la información nueva
     * @returns La matrícula actualizada
     *
     * @throws NotFoundException Si la matrícula no existe
     */
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

        matricula.estado = EstadoOMatricula.INACTIVA;

        this.MatriculaRepo.save(matricula);
    }

    public async delete(id: number) {
        // TODO aumentar cupo de carrera?
        const result = await this.MatriculaRepo.softDelete(id);

        if (result.affected == 0) {
          throw new NotFoundException('Matrícula no encontrada. No se hizo ningún cambio');
        }

        return result;
    }

    public async testCreate(matricula: MatriculaDTO){
        const carrera = await this.carreraService.getCarrera(matricula.ID_carrera);
        if (!carrera) throw new NotFoundException('Carrera no encontrada');
        if(carrera.cupos < 1) throw new BadRequestException(`Cupos insuficientes (${carrera.cupos} cupos disponibles)`);

        const estudiante = await this.estudianteRepository.findOneBy({
            ID_estudiante: matricula.ID_estudiante
        });
        if(!estudiante)throw new NotFoundException('Estudiante no encontrado');

        const result = this.MatriculaRepo.create({
            semestre: matricula.semestre,
            carrera: carrera,
            estudiante: estudiante
        });

        const savedMatricula = await this.MatriculaRepo.save(result);

        carrera.cupos -= 1;
        await this.carreraRepository.save(carrera);

        return savedMatricula;
    }

    /**
     * Obtiene la última matrícula de un estudiante a partir de su RUT.
     *
     * @param rut El RUT del estudiante
     * @returns La matrícula del estudiante
     */
    public async getMatriculaRut(rut: string): Promise<MatriculaEntity> {
        const estudiante = await this.estudianteRepository.findOneBy({
            rut: rut
        });
        if (!estudiante) throw new NotFoundException('Estudiante no encontrado');

        const matricula = await this.ultimaMatricula(estudiante.ID_estudiante);
        if (!matricula) throw new ForbiddenException('Estudiante no está matriculado')

        return matricula;
    }
}
