import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PeriodoInscripcionEntity } from './preiodo-inscripcion.entity';
import { CreatePeriodoInscripcionDto } from './dto/create-periodo-inscripcion.dto';
import { UpdatePeriodoInscripcionDto } from './dto/update-periodo-inscripcion.dto';

@Injectable()
export class PeriodoInscripcionService {
  constructor(
    @InjectRepository(PeriodoInscripcionEntity)
    private readonly periodoRepository: Repository<PeriodoInscripcionEntity>,
  ) {}

  /**
   * Valida que cierta fecha esté dentro del periodo
   * 
   * @param fecha Date
   * @param periodoID Number
   * @returns Promise<boolean>
   */
  async dentroDelPeriodo(fecha:Date, periodoID: number): Promise<boolean>{
        const periodo = await this.periodoRepository.findOne({
            where: {ID_periodo: periodoID}
        });
        if (!periodo) throw new NotFoundException('Periodo de inscripción no encontrado');
        const ini = periodo.inicio;
        const fin = periodo.final;
        return (fecha < fin && fecha >= ini);
    }

  /**
   * Obtiene todos los períodos de inscripción activos.
   *
   * @returns Lista de períodos de inscripción.
   */
  async findAll(): Promise<PeriodoInscripcionEntity[]> {
    return this.periodoRepository.find({
      relations: ['ofertas'],
    });
  }

  /**
   * Obtiene un período de inscripción por su ID.
   *
   * @param id ID del período.
   * @returns Período encontrado.
   * @throws NotFoundException si no existe.
   */
  async findOne(
    id: number,
  ): Promise<PeriodoInscripcionEntity> {
    const periodo = await this.periodoRepository.findOne({
      where: {
        ID_periodo: id,
      },
      relations: ['ofertas'],
    });

    if (!periodo) {
      throw new NotFoundException(
        `Período de inscripción con ID ${id} no encontrado`,
      );
    }

    return periodo;
  }

  /**
   * Crea un nuevo período de inscripción.
   *
   * @param data Datos del período.
   * @returns Período creado.
   */
  async create(
    data: CreatePeriodoInscripcionDto,
  ): Promise<PeriodoInscripcionEntity> {
    const periodo =
      this.periodoRepository.create(data);

    return this.periodoRepository.save(periodo);
  }

  /**
   * Actualiza un período existente.
   *
   * @param id ID del período.
   * @param data Datos a actualizar.
   * @returns Período actualizado.
   */
  async update(
    id: number,
    data: UpdatePeriodoInscripcionDto,
  ): Promise<PeriodoInscripcionEntity> {
    const periodo = await this.findOne(id);

    Object.assign(periodo, data);

    return this.periodoRepository.save(periodo);
  }

  /**
   * Realiza un borrado lógico del período.
   *
   * @param id ID del período.
   */
  async remove(id: number): Promise<void> {
    await this.findOne(id);

    await this.periodoRepository.softDelete(id);
  }

  /**
   * Restaura un período eliminado lógicamente.
   *
   * @param id ID del período.
   * @throws NotFoundException si no existe.
   */
  async restore(id: number): Promise<void> {
    const result =
      await this.periodoRepository.restore(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Período de inscripción con ID ${id} no encontrado`,
      );
    }
  }
}