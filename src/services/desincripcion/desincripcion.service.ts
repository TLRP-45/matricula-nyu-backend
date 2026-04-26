import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteTomaOfertaEntity } from '../../modules/estudiante/estudiante-toma-oferta.entity';
import { OfertaEntity } from '../../modules/oferta/oferta.entity';
import { EstudianteEntity } from '../../modules/estudiante/estudiante.entity';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class DesincripcionService {
    constructor(
        @InjectRepository(EstudianteTomaOfertaEntity)
        private readonly TomaRepository: Repository<EstudianteTomaOfertaEntity>,
        @InjectRepository(EstudianteEntity)
        private readonly EstudianteRepository: Repository<EstudianteEntity>,
        @InjectRepository(OfertaEntity)
        private readonly OfertaRepository: Repository<OfertaEntity>,
    ) {}

    // Reemplazar por algún método que ya exista en inscripción
    async EstaInscrito(estudiante: EstudianteEntity, oferta: OfertaEntity):Promise<boolean>{
        const idEstudiante = estudiante.ID_estudiante;
        const EstudianteInscrito = await this.TomaRepository.find({
            where: {
                estudiante: { ID_estudiante: idEstudiante },
            },
            relations: ['estudiante'],
            });
        if (EstudianteInscrito.length === 0) {
            const idOferta = oferta.ID_oferta
            const OfertaInscrita = await this.TomaRepository.find({
            where: {
                oferta: { ID_oferta: idOferta },
            },
            relations: ['oferta'],
            });
            if (OfertaInscrita.length === 0){
                return false;
            }
            return true;
        }
        return false;
    }

    async Desinscribir(estudiante: EstudianteEntity, oferta: OfertaEntity, fecha: Date): Promise<boolean>{
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

        const ini = periodo.inicio;
        const fin = periodo.final;

        if (!(fecha < fin && fecha >= ini)){
            toma.estado = 'casual';
            await this.TomaRepository.save(toma);

            return true;
        } else {
            oferta.cupos += 1

            if (oferta.tomada) {
                const idxO = oferta.tomada.findIndex(t => t.ID_toma === toma.ID_toma);
                if (idxO !== -1) oferta.tomada.splice(idxO, 1);
            }

            if (estudiante.toma) {
                const idxE = estudiante.toma.findIndex(t => t.ID_toma === toma.ID_toma);
                if (idxE !== -1) estudiante.toma.splice(idxE, 1);
            }

            await this.OfertaRepository.save(oferta);
            await this.TomaRepository.remove(toma);
            await this.EstudianteRepository.save(estudiante);

            return true;
        }
        return false;
    }
}