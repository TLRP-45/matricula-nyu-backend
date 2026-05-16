import { Inject, Injectable } from '@nestjs/common';
import { EstudianteService } from '../estudiante/estudiante.service';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Like, UpdateResult } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { AsignaturaEntity } from './asignatura.entity';
import { CarreraTieneAsignaturaEntity } from '../carrera/carrera-tiene-asignatura.entity';
import { AsignaturaCreateDto } from './dto/asignatura.dto';
import { MatriculaEntity } from '../matricula/matricula.entity';
import { AsignaturaPrerrequisitosDto, AsignaturaCarreraDto } from './asignatura.controller';
import { AsignaturaPutDto } from './dto/asignatura-update.dto';
import { CarreraEntity } from '../carrera/carrera.entity';

@Injectable()
export class AsignaturaService {
    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepo: Repository<EstudianteEntity>,
        @InjectRepository(AsignaturaEntity)
        private AsignaturaRepo: Repository<AsignaturaEntity>,
        private readonly EstudianteService: EstudianteService,
        @InjectRepository(CarreraTieneAsignaturaEntity)
        private readonly CarreraTieneAsignaturaRepo: Repository<CarreraTieneAsignaturaEntity>,
        @InjectRepository(MatriculaEntity)
        private readonly MatriculaRepo: Repository<MatriculaEntity>,
        @InjectRepository(CarreraEntity)
        private readonly CarreraRepo: Repository<CarreraEntity>
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
        const result = await this.CarreraTieneAsignaturaRepo
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
     * la asignatura indicada por id, de la carrera indicada
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
    async getPrerrerequisitos(asignaturaID:number){
        const result = await this.AsignaturaRepo.findOneBy({
            ID_asignatura : asignaturaID
        });
        if (!result)throw new NotFoundException('No se pudieron encontrar la asignatura.')
        return result.prerrequisitos;
    }

    /**
     * Encuentra las asignaturas buscándolas por el nombre que contenga lo dado
     * @param busqueda - el string con el nombre a buscar
     * @returns Promise<AsignaturaEntity[] | undefined> - Arreglo con las asignaturas
     * encontradas, o nada
     */
    async getPorNombre(busqueda: string): Promise<AsignaturaEntity[] | undefined>{
        return await this.AsignaturaRepo.find({
            where: {nombre : Like(`%${busqueda}%`)}
        });
    }

    /**
     * Encuentra las asignaturas buscándolas por el código al inicio de su nombre
     * @param busqueda - el string con el código de carrera a buscar
     * @returns Promise<AsignaturaEntity[] | undefined> - Arreglo
     * con las asignaturas encontradas, o nada
     */
    async getPorCodigo(busqueda: string): Promise<AsignaturaEntity[] | undefined>{
        return await this.AsignaturaRepo.find({
            where: {nombre: Like(`%${busqueda}%-%`)}
        });
    }

    /**
   * Crea una nueva asignatura junto con sus prerrequisitos si se proporcionan.
   *
   * - Valida que los prerrequisitos existan.
   * - Inserta la asignatura con sus relaciones.
   *
   * @param dto Datos para la creación de la asignatura
   * @returns La entidad Asignatura creada
   * @throws NotFoundException Si algún prerrequisito no existe
   */
    async create(dto: AsignaturaCreateDto): Promise<AsignaturaEntity> {

        let prereqEntities: AsignaturaEntity[] = [];

        if (dto.prerrequisitos?.length) {
            const prereqEntities = await this.AsignaturaRepo.find({
                where: { ID_asignatura: In(dto.prerrequisitos) },
            });

            if (prereqEntities.length !== dto.prerrequisitos.length) {
                throw new NotFoundException('Uno o más prerrequisitos no existen');
            }
        }

        const asignatura = this.AsignaturaRepo.create({
            nombre: dto.nombre,
            creditos: dto.creditos,
            caracter: dto.caracter,
            hrs_presenciales: dto.hrs_presenciales,
            hrs_autonomo: dto.hrs_autonomo,
            prerrequisitos: prereqEntities,
        });

        return await this.AsignaturaRepo.save(asignatura);
    }

    /**
     * SoftDelete
     * @param id - número de identificación de asignatura a borrar
     * @returns UpdateResult - si se borró o no
     */
    async delete(id: number) {
        const result = await this.AsignaturaRepo.softDelete(id);
        if (result.affected == 0) {
          throw new NotFoundException('Asignatura no encontrada. No se hizo ningún cambio');
        }
        return result;
    }

    /**
     * Agrega un prerrequisito a una asignatura, y actualiza dependencias
     * @param aID number - Número identificador de asignatura
     * @param preID number - Número identificador de asignatura
     */
    async pushPrerrequisito(aID: number, preID: AsignaturaPrerrequisitosDto){
        const asignatura = await this.AsignaturaRepo.findOne({
            where: { ID_asignatura: aID },
            relations: ['prerrequisitos'],
        });
        if (!asignatura)throw new NotFoundException('Asignatura no encontrada');

        const prerrequisito = await this.AsignaturaRepo.find({
            where: { ID_asignatura: In(preID.ID_prerrequisitos) },
            relations: ['esPrerequisitoDe'],
        });
        if (!prerrequisito)throw new NotFoundException('Asignaturas no encontradas');

        asignatura.prerrequisitos.concat(prerrequisito);
        await prerrequisito.forEach(p => {
            p.esPrerequisitoDe.push(asignatura);
            this.AsignaturaRepo.save(p);
        });

        await this.AsignaturaRepo.save(asignatura);
    }

    /**
     * Reemplaza a su totalidad los prerrequisitos de una asignatura
     * y actualiza dependecias
     * @param aID number - Número identificador de asignatura
     * @param preID number[] - Números identificadores de asignaturas
     */
    async replacePrerrequisito(aID: number, preID: AsignaturaPrerrequisitosDto){
        const asignatura = await this.AsignaturaRepo.findOne({
            where: { ID_asignatura: aID },
            relations: ['prerrequisitos'],
        });
        if (!asignatura)throw new NotFoundException('Asignatura no encontrada');

        const prerrequisito = await this.AsignaturaRepo.find({
            where: { ID_asignatura: In(preID.ID_prerrequisitos) },
            relations: ['esPrerequisitoDe'],
        });
        if (!prerrequisito)throw new NotFoundException('Asignaturas no encontradas');

        await asignatura.prerrequisitos.forEach(p => {
            const actualizado = p.esPrerequisitoDe.filter(i => i.ID_asignatura !== aID);
            p.esPrerequisitoDe = actualizado;
            this.AsignaturaRepo.save(p);
        });
        asignatura.prerrequisitos = prerrequisito;
        prerrequisito.forEach(p => {
            p.esPrerequisitoDe.push(asignatura);
        });

        await this.AsignaturaRepo.save(asignatura);
        await this.AsignaturaRepo.save(prerrequisito);
    }

    /**
     * Elimina asignaturas como prerrequisitos de otra y actualiza dependecias
     * @param aID number - Número identificador de asignatura
     * @param preID number[] - Números identificadores de asignaturas
     */
    async removePrerrequisito(aID: number, preID: AsignaturaPrerrequisitosDto){
        const asignatura = await this.AsignaturaRepo.findOne({
            where: { ID_asignatura: aID },
            relations: ['prerrequisitos'],
        });
        if (!asignatura)throw new NotFoundException('Asignatura no encontrada');

        const prerrequisito = await this.AsignaturaRepo.find({
            where: { ID_asignatura: In(preID.ID_prerrequisitos) },
            relations: ['esPrerequisitoDe'],
        });
        if (!prerrequisito)throw new NotFoundException('Asignaturas no encontradas');

        await asignatura.prerrequisitos.forEach(p => {
            const actualizado = p.esPrerequisitoDe.filter(i => i.ID_asignatura !== aID);
            p.esPrerequisitoDe = actualizado;
            this.AsignaturaRepo.save(p);
        });

        const preIDset = new Set(preID.ID_prerrequisitos);
        asignatura.prerrequisitos = asignatura.prerrequisitos.filter(i => !preIDset.has(i.ID_asignatura));
        await this.AsignaturaRepo.save(asignatura);
    }

    /**
     * Actualiza los datos de la asignatura con los dados en la
     * Base de datos, utilizando el método update te typeorm
     * @param id - Número identificador de la asignatura
     * @param actualizado - Asignatura actualziada
     * @returns UpdateResult - resultado de la actualziación
     */
    async update(id: number, actualizado: AsignaturaPutDto): Promise<UpdateResult>{
        const result: UpdateResult = await this.AsignaturaRepo.update(id, actualizado);
        if(result.affected == 0) throw new NotFoundException('Asignatura no encontrada');
        return result;
    }

    /**
     * Agrega una carrera a una asignatura, y actualiza dependencias
     * @param aID number - Número identificador de asignatura
     * @param ctaDto AsignaturaCarreraDto - DTO con datos
     */
    async pushCarrera(aID: number, ctaDto: AsignaturaCarreraDto){
        const asignatura = await this.AsignaturaRepo.findOne({
            where: { ID_asignatura: aID },
            relations: ['es_de'],
        });
        if (!asignatura)throw new NotFoundException('Asignatura no encontrada');

        const carrera = await this.CarreraRepo.findOne({
            where: { id_carrera: ctaDto.ID_carrera },
            relations: ['tiene'],
        });
        if (!carrera)throw new NotFoundException('Carrera no encontrada');

        const nuevaRelacion = this.CarreraTieneAsignaturaRepo.create({
            carrera: carrera,
            asignatura: asignatura,
            semestre: ctaDto.semestre,
            posicion: ctaDto.posicion
        });
        await this.CarreraTieneAsignaturaRepo.save(nuevaRelacion);

        asignatura.es_de.concat([nuevaRelacion]);
        carrera.tiene.concat([nuevaRelacion]);

        await this.AsignaturaRepo.save(asignatura);
        await this.CarreraRepo.save(carrera);
    }

    /**
     * Elimina las relaciones entre carrera y asignatura, y actualiza dependecias
     * @param aID number - Número identificador de asignatura
     * @param ctaDto AsignaturaCarreraDto - DTO con datos
     */
    async removeCarrera(aID: number, ctaDto: AsignaturaCarreraDto){
        const cID = ctaDto.ID_carrera
        const relacion = await this.CarreraTieneAsignaturaRepo
        .createQueryBuilder('cta')
        .leftJoinAndSelect('cta.asignatura', 'a')
        .leftJoinAndSelect('cta.carrera', 'c')
        .where('a.ID_asignatura = :aID', {aID})
        .andWhere('c.id_carrera = :cID', {cID})
        .getOne();
        if(relacion){
            await this.CarreraTieneAsignaturaRepo.remove(relacion);
            relacion.asignatura.es_de = relacion.asignatura.es_de.filter(c => c.ID_toma !== relacion.ID_toma);
            relacion.carrera.tiene = relacion.carrera.tiene.filter(c => c.ID_toma !== relacion.ID_toma);
            await this.AsignaturaRepo.save(relacion.asignatura);
            await this.CarreraRepo.save(relacion.carrera);
        }
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

        const matricula = await this.MatriculaRepo.findOne({
            where: {estudiante: estudiante,
                estado: 'activa'}
        });
        if(!matricula)throw new BadRequestException('Estudiante no está matriculado')

        const asignatura = await this.AsignaturaRepo.findOne({
            where: { ID_asignatura: asignaturaID },
            relations: ['prerrequisitos'],
        });
        if (!asignatura)throw new NotFoundException('Asignatura no encontrada');

        const prerrequisitos = asignatura.prerrequisitos.filter(as => as.es_de.some(cta => cta.carrera === matricula.carrera));

        for (const p of prerrequisitos){
            const tomas_del_ramo =await this.EstudianteService.buscarTomaPorAsignatura(p.ID_asignatura);
            const aprobados = tomas_del_ramo.filter(item => item.estado === 'aprobado');
            if (aprobados.length <= 0)throw new BadRequestException(`Debes aprobar ${p.nombre} antes de ${asignatura.nombre}`);
        }
        return true;
    }
}