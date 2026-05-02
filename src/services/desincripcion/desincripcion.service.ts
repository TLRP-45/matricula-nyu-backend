import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteTomaOfertaEntity } from '../../modules/estudiante/estudiante-toma-oferta.entity';
import { OfertaEntity } from '../../modules/oferta/oferta.entity';
import { EstudianteEntity } from '../../modules/estudiante/estudiante.entity';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PeriodoInscripcionService } from '../../modules/periodo-inscripcion/periodo-inscripcion.service';

@Injectable()
export class DesincripcionService {
    constructor(
        @InjectRepository(EstudianteTomaOfertaEntity)
        private readonly TomaRepository: Repository<EstudianteTomaOfertaEntity>,
        @InjectRepository(EstudianteEntity)
        private readonly EstudianteRepository: Repository<EstudianteEntity>,
        @InjectRepository(OfertaEntity)
        private readonly OfertaRepository: Repository<OfertaEntity>,
        private readonly PeriodoService: PeriodoInscripcionService
    ) {}

    /**
     * Verifica si un estudiante ya está inscrito en una oferta específica.
     *
     * Consulta la tabla estudiante-toma-oferta y cuenta cuántos registros existen que coincidan
     * con el estudiante y la oferta proporcionados. Si el número de coincidencias
     * es mayor que cero, significa que ya está inscrito.
     *
     * @param estudiante - Entidad del estudiante a verificar.
     * @param oferta - Entidad de la oferta académica.
     * @returns Promise<boolean> - true si está inscrito, false si no.
     */
    async EstaInscrito(estudiante: EstudianteEntity, oferta: OfertaEntity): Promise<boolean> {
         return (await this.TomaRepository.count({
            where: {
                estudiante: { ID_estudiante: estudiante.ID_estudiante },
                oferta: { ID_oferta: oferta.ID_oferta },
            },
            })) > 0;
    }

    /**
     * Desinscribe a un estudiante de una oferta académica.
     *
     * Este método verifica que el estudiante y la oferta existan, confirma que el estudiante
     * esté inscrito y determina si la desinscripción ocurre dentro o fuera del periodo permitido.
     *
     * - Si ocurre **fuera del periodo**, la Toma no se elimina: solo se marca con estado "casual".
     * - Si ocurre **dentro del periodo**, se libera un cupo en la oferta, se eliminan referencias
     *   de las relaciones cargadas en memoria y se aplica un **soft delete** a la inscripción.
     *
     * @param estudianteID - Identificador del estudiante.
     * @param ofertaID - Identificador de la oferta académica.
     * @returns Promise<boolean> - true si la desinscripción se realizó correctamente.
     *
     * @throws NotFoundException   - Si el estudiante o la oferta no existen.
     * @throws BadRequestException - Si el estudiante no está inscrito en la oferta.
     * @throws InternalServerErrorException - Si faltan relaciones esenciales o hay inconsistencias.
     */
    async Desinscribir(estudianteID: number, ofertaID: number): Promise<boolean>{
        const estudiante = await this.EstudianteRepository.findOne({
            where: { ID_estudiante: estudianteID },
            relations: ['toma'],
        });
        if (!estudiante)throw new NotFoundException('Estudiante no encontrado');

        const oferta = await this.OfertaRepository.findOne({
            where: { ID_oferta: ofertaID },
            relations: ['periodo_inscripcion', 'tomada', 'asignatura'],
        });
        if (!oferta)throw new NotFoundException('Oferta no encontrada');

        const fecha = new Date();
        const estaInscrito = await this.EstaInscrito(estudiante, oferta);
        if(!estaInscrito)throw new BadRequestException('El estudiante no está inscrito en esta oferta');

        const periodo = oferta.periodo_inscripcion;
        if (!periodo) throw new InternalServerErrorException('Oferta sin asociar a periodo de inscripción');

        const toma = await this.TomaRepository.findOne({
            where: {
            estudiante: { ID_estudiante: estudiante.ID_estudiante },
            oferta: { ID_oferta: oferta.ID_oferta }
            }});
        if(!toma) throw new InternalServerErrorException('Cambios actuales en la base de datos');

        if (await !this.PeriodoService.dentroDelPeriodo(fecha, periodo.ID_periodo)){
            toma.estado = 'casual';
            await this.TomaRepository.save(toma);

            return true;
        } else {
            await this.OfertaRepository.increment(
                { ID_oferta: oferta.ID_oferta },
                'cupos',
                1,
            );

            if (oferta.tomada) {
                const idxO = oferta.tomada.findIndex(t => t.ID_toma === toma.ID_toma);
                if (idxO !== -1) oferta.tomada.splice(idxO, 1);
            }

            if (estudiante.toma) {
                const idxE = estudiante.toma.findIndex(t => t.ID_toma === toma.ID_toma);
                if (idxE !== -1) estudiante.toma.splice(idxE, 1);
            }

            await this.TomaRepository.softRemove(toma);
            await this.EstudianteRepository.save(estudiante);

            return true;
        }
        return false;
    }
}