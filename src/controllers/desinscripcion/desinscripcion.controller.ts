import { Controller, Post, Body, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DesincripcionService } from '../../services/desincripcion/desincripcion.service';
import { EstudianteTomaOfertaEntity } from '../../modules/estudiante/estudiante-toma-oferta.entity';

import { IsInt, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';

export class DesinscripcionDto {
  @ValidateIf(o => !Array.isArray(o.ID_toma))
  @Type(() => Number)
  @IsInt()
  ID_toma!: number | number[];
}

@Controller('desinscripcion')
export class DesinscripcionController {
  constructor(
    private readonly desincripcionService: DesincripcionService,

     @InjectRepository(EstudianteTomaOfertaEntity)
    private readonly tomaRepo: Repository<EstudianteTomaOfertaEntity>,
  ) {}

  /**
   * Desinscribe uno o varios registros de toma de oferta.
   *
   * ### Funcionamiento
   * - Si `ID_toma` recibido en el DTO es un número:  
   *   ➜ se procesa una sola desinscripción.
   *
   * - Si `ID_toma` es un arreglo de números:  
   *   ➜ se procesan varias desinscripciones en paralelo mediante `Promise.all()`.
   *
   * ### Respuestas
   * - `200 OK`: Desinscripción exitosa (individual o múltiple)
   * - `404 NotFoundException`: Alguna inscripción no existe
   * - `400 BadRequestException`: Alguna desinscripción es inválida o no permitida
   *
   * @param dto Objeto DTO que contiene un ID o lista de IDs de toma.
   * @returns Un objeto de éxito o una lista de objetos de éxito.
   */
  @Post()
  async desinscribir(@Body() dto: DesinscripcionDto) {
    if (!Array.isArray(dto.ID_toma)) {
      return await this.desinscribirUnico(dto.ID_toma);
    } else {
      return Promise.all(
        dto.ID_toma.map(of =>
          this.desinscribirUnico(of)
        )
      );
    }
  }

  /**
   * Realiza la desinscripción de una sola toma.
   *
   * ### Flujo del método
   * 1. Busca la toma por su ID, incluyendo relaciones `estudiante` y `oferta`.
   * 2. Si la toma no existe → lanza `NotFoundException`.
   * 3. Llama al servicio `Desinscribir()` con el estudiante y oferta asociados.
   * 4. Si la operación falla → lanza `BadRequestException`.
   * 5. Devuelve un mensaje de éxito.
   *
   * ### Excepciones
   * - `NotFoundException`: La toma no existe.
   * - `BadRequestException`: No fue posible realizar la desinscripción (reglas de negocio).
   *
   * @param tomaID ID numérico de la inscripción a desinscribir.
   * @returns Mensaje estándar de éxito.
   */
  async desinscribirUnico(tomaID: number) {
    const toma = await this.tomaRepo.findOne({
      where: { ID_toma: tomaID },
      relations: ['estudiante', 'oferta'],
    });

    if (!toma) {
      throw new NotFoundException('Inscripción no encontrada');
    }

    const ok = await this.desincripcionService.Desinscribir(
      toma.estudiante.ID_estudiante,
      toma.oferta.ID_oferta,
    );

    if (!ok) {
      throw new BadRequestException('No se pudo desinscribir');
    }

    return {
      message: 'Desinscripción realizada correctamente',
      estado: 'OK',
    };
  }
}