import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfesorEntity } from './profesor.entity';
import { CreateProfesorDto } from './dto/profesor.dto';
import { UpdateProfesorDto } from './dto/profesor-update.dto';

@Injectable()
export class ProfesorService {
  constructor(
    @InjectRepository(ProfesorEntity)
    private readonly profesorRepository: Repository<ProfesorEntity>,
  ) {}

  /**
   * Obtiene todos los profesores registrados.
   *
   * @returns Lista de profesores con sus clases asociadas.
   */
  async findAll(): Promise<ProfesorEntity[]> {
    return this.profesorRepository.find({
      relations: ['clases'],
    });
  }

  /**
   * Busca un profesor por su ID.
   *
   * @param id ID único del profesor.
   * @returns Profesor encontrado.
   * @throws NotFoundException Si el profesor no existe.
   */
  async findOne(id: number): Promise<ProfesorEntity> {
    const profesor = await this.profesorRepository.findOne({
      where: { ID_profesor: id },
      relations: ['clases'],
    });

    if (!profesor) {
      throw new NotFoundException(
        `Profesor con ID ${id} no encontrado`,
      );
    }

    return profesor;
  }

  /**
   * Crea un nuevo profesor.
   *
   * @param data Datos del profesor a crear.
   * @returns Profesor creado y almacenado en la base de datos.
   */
  async create(
    data: CreateProfesorDto,
    ): Promise<ProfesorEntity> {
    const profesor = this.profesorRepository.create(data);
    return this.profesorRepository.save(profesor);
  }

  /**
   * Actualiza la información de un profesor existente.
   *
   * @param id ID del profesor a actualizar.
   * @param data Nuevos datos del profesor.
   * @returns Profesor actualizado.
   * @throws NotFoundException Si el profesor no existe.
   */
  async update(
    id: number,
    data: UpdateProfesorDto,
    ): Promise<ProfesorEntity> {
    const profesor = await this.findOne(id);

    Object.assign(profesor, data);

    return this.profesorRepository.save(profesor);
  }

  /**
   * Elimina lógicamente un profesor de la base de datos.
   *
   * @param id ID del profesor a eliminar.
   * @returns Promise<void>
   * @throws NotFoundException Si el profesor no existe.
   */
  async remove(id: number): Promise<void> {
    await this.profesorRepository.softDelete(id);
  }
}