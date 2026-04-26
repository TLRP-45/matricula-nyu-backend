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

    async EstaInscrito(estudiante: EstudianteEntity, oferta: OfertaEntity): Promise<boolean> {
        return this.TomaRepository.exist({
            where: {
                estudiante: { ID_estudiante: estudiante.ID_estudiante },
                oferta: { ID_oferta: oferta.ID_oferta },
            },
         });
    }

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

            await this.TomaRepository.remove(toma);
            await this.EstudianteRepository.save(estudiante);

            return true;
        }
        return false;
    }
}