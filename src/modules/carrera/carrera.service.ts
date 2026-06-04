import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarreraEntity } from './carrera.entity';
import { Repository, Like, UpdateResult, In } from 'typeorm';
import { CarreraCreateDTO } from './dto/carrera.dto';
import { CarreraUpdateDTO } from './dto/carrera-update.dto';
import { AsignaturaService } from '../asignatura/asignatura.service';
import { MatriculaEntity } from '../matricula/matricula.entity';

@Injectable()
export class CarreraService {
    constructor(
    @InjectRepository(CarreraEntity)
    private readonly carreraRepository: Repository<CarreraEntity>,
    private asignaturaService: AsignaturaService,
    @InjectRepository(MatriculaEntity)
    private readonly matriculaRepository: Repository<MatriculaEntity>
    ) {}

    /**
     * Obtiene todas las carreras registradas en la base de datos.
     *
     * @returns {Promise<CarreraEntity[]>} Lista completa de carreras.
     *
     * @description
     * Este método ejecuta un `find()` simple sobre el repositorio,
     * devolviendo todas las filas sin filtros ni relaciones adicionales.
     */
    async getAllCarreras(): Promise<CarreraEntity[]> {
        const result = await this.carreraRepository.find();
        return result;
    }

    /**
     * Obtiene una carrera específica mediante su identificador.
     *
     * @param {number} id - ID único de la carrera.
     * @returns {Promise<CarreraEntity>} La carrera encontrada.
     * @throws {NotFoundException} Si no existe una carrera con ese ID.
     *
     * @description
     * Utiliza `findOneBy` para buscar una carrera.
     * Si no se encuentra, se lanza una excepción 404.
     */
    async getCarrera(id: number) {
        const result = await this.carreraRepository.findOneBy({
            id_carrera: id,
        });
        if(!result)throw new NotFoundException('Carrera no encontrada');
        return result;
    }

    /**
     * Crea una nueva carrera en la base de datos.
     *
     * @param {CarreraCreateDTO} carrera - Datos necesarios para crear la carrera.
     * @returns {Promise<CarreraEntity>} La carrera creada y persistida.
     *
     * @description
     * Primero genera una instancia de la entidad usando `create()`,
     * luego la persiste en la base de datos con `save()`.
     *
     * `create()` NO guarda en BD, solo instancia.
     * `save()` hace el INSERT real.
     */
    create(carrera: CarreraCreateDTO): Promise<CarreraEntity> {
        const result = this.carreraRepository.create(carrera);
        return this.carreraRepository.save(result);
    }

    /**
     * Encuentra las carreras buscándolas por el nombre que contenga lo dado
     * @param {string} busqueda - el string con el nombre a buscar
     * @returns {Promise<CarreraEntity[] | undefined>} - Arreglo con las asignaturas
     * encontradas, o nada
     */
    async getPorNombre(busqueda: string): Promise<CarreraEntity[] | undefined>{
        return await this.carreraRepository.find({
            where: {nombre : Like(`%${busqueda}%`)}
        });
    }

    /**
     * Encuentra las carreras buscándolas por el nombre de su facultad que contenga lo dado
     * @param {string} busqueda - el string con el nombre a buscar
     * @returns {Promise<CarreraEntity[] | undefined>} - Arreglo con las asignaturas
     * encontradas, o nada
     */
    async getPorFacultad(busqueda: string): Promise<CarreraEntity[] | undefined>{
        return await this.carreraRepository.find({
            where: {facultad : Like(`%${busqueda}%`)}
        });
    }

    /**
     * SoftDelete
     * @param id - número de identificación de carrera a borrar
     * @returns UpdateResult - si se borró o no
     */
    async delete(id: number) {
        const result = await this.carreraRepository.softDelete(id);
        if (result.affected == 0) {
          throw new NotFoundException('Carrera no encontrada. No se hizo ningún cambio');
        }
        return result;
    }

    /**
     * Actualiza los datos de la carrera con los dados en la
     * Base de datos, utilizando el método update te typeorm
     * @param id - Número identificador de la asignatura
     * @param actualizado - Asignatura actualziada
     * @returns UpdateResult - resultado de la actualziación
     */
    async update(id: number, actualizado: CarreraUpdateDTO): Promise<UpdateResult>{
        const result: UpdateResult = await this.carreraRepository.update(id, actualizado);
        if(result.affected == 0) throw new NotFoundException('Asignatura no encontrada');
        return result;
    }
}
