import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteTomaOfertaEntity } from './estudiante-toma-oferta.entity';
import { UsuarioEntity } from './usuario.entity';
import { BloqueHorarioEntity } from '../bloque-horario/bloque-horario.entity';
import { BadRequestException } from '@nestjs/common';
import { MatriculaEntity } from '../matricula/matricula.entity';
import { CarreraEntity } from '../carrera/carrera.entity';
import { CarreraTieneAsignaturaEntity } from '../carrera/carrera-tiene-asignatura.entity';
import { OfertaEntity } from '../oferta/oferta.entity';
import { EstadoToma } from './estado-toma.enum';
import { RolUsuario } from './rol-usuario.enum';
import { EstadoOMatricula } from '../matricula/matricula-estado.enum';

@Injectable()
export class EstudianteService {
    constructor(
        @InjectRepository(EstudianteTomaOfertaEntity)
        private readonly TomaRepo: Repository<EstudianteTomaOfertaEntity>,
        @InjectRepository(UsuarioEntity)
        private readonly EstudianteRepo: Repository<UsuarioEntity>,
        @InjectRepository(MatriculaEntity)
        private readonly MatriculaRepo: Repository<MatriculaEntity>,
        @InjectRepository(CarreraEntity)
        private readonly CarreraRepo: Repository<CarreraEntity>,
        @InjectRepository(CarreraTieneAsignaturaEntity)
        private readonly CarreraAsignaturaRepo:Repository<CarreraTieneAsignaturaEntity>,
        @InjectRepository(OfertaEntity)
        private readonly OfertaRepo:Repository<OfertaEntity>,
    ) {}

    async buscarTomaPorAsignatura(ID_asignatura: number){
        return this.TomaRepo
        .createQueryBuilder('toma')
        .leftJoinAndSelect('toma.oferta', 'oferta')
        .leftJoinAndSelect('oferta.asignatura', 'asignatura')
        .where('asignatura.ID_asignatura = :ID_asignatura', { ID_asignatura })
        .getMany();
    }

    // horario
    async horarioPorEstudiante(ID_estudiante: number): Promise<BloqueHorarioEntity[]>{
        const estudiante = await this.EstudianteRepo.findOne({
            where: { ID_estudiante },
            relations: [
                'toma',
                'toma.oferta',
                'toma.oferta.horarios'
            ]
        });
        if (!estudiante)throw new NotFoundException('Estudiante no encontrado');

        const ramos = estudiante.toma;
        if (!ramos)throw new InternalServerErrorException('Falla en la base de datos');

        const horarios = ramos.flatMap(r => r.oferta?.horarios ?? []);
        return horarios;
    }
    //REGISTRAR USUARIO CON LA MATRICULA DE INGRESO DE SU CARERRA
    async registrar(dto: any) {

    const existenteEmail = await this.EstudianteRepo.findOne({
        where: { email: dto.email }
    });

    if (existenteEmail) {
        throw new BadRequestException(
            'El correo ya está registrado'
        );
    }

    const existenteRut = await this.EstudianteRepo.findOne({
        where: { rut: dto.rut }
    });

    if (existenteRut) {
        throw new BadRequestException(
            'El RUT ya está registrado'
        );
    }

let carrera: CarreraEntity | null = null;
if (dto.rol === 1) {

    if (!dto.ID_carrera) {
        throw new BadRequestException(
            'Debe seleccionar una carrera'
        );
    }

    carrera = await this.CarreraRepo.findOne({
        where: {
            id_carrera: dto.ID_carrera
        }
    });

    if (!carrera) {
        throw new NotFoundException(
            'Carrera no encontrada'
        );
    }
}

    const estudiante = this.EstudianteRepo.create({
        nombre: dto.nombre,
        apellido: dto.apellido,
        email: dto.email,
        rut: dto.rut,
        nacionalidad: dto.nacionalidad,
        sexo: dto.sexo,
        nacimiento: dto.nacimiento,
        direccion: dto.direccion,
        telefono: dto.telefono,
        password: dto.password,
    });

    estudiante.rol = dto.rol === 1 ? RolUsuario.Estudiante : RolUsuario.Admin;


    const estudianteGuardado =
        await this.EstudianteRepo.save(estudiante);

    if (dto.rol === 0) {
        return {
            mensaje: 'Administrador registrado correctamente',
            estudiante: estudianteGuardado
        };
    }

    const matricula = this.MatriculaRepo.create({
        estudiante: estudianteGuardado,
        carrera: carrera!,
        semestre: 1,
        estado: EstadoOMatricula.ACTIVA,
        arancel_aldia: true
    });

    await this.MatriculaRepo.save(matricula);
    const asignaturasPrimerSemestre =
    await this.CarreraAsignaturaRepo.find({
        where: {
            carrera: {
                id_carrera: carrera!.id_carrera
            },
            semestre: 1
        },
        relations: ['asignatura']
    });

for (const ramo of asignaturasPrimerSemestre) {

    const oferta = await this.OfertaRepo.findOne({
        where: {
            asignatura: {
                ID_asignatura:
                ramo.asignatura.ID_asignatura
            }
        },
        relations: ['asignatura']
    });

    if (!oferta) continue;


const toma = this.TomaRepo.create({
    estudiante: { ID_estudiante: estudianteGuardado.ID_estudiante } as any,
    oferta: { ID_oferta: oferta.ID_oferta } as any,
    estado: EstadoToma.INSCRITO,
    inscrita: new Date()
});

await this.TomaRepo.save(toma);
}

    return {
        mensaje: 'Usuario registrado correctamente',
        estudiante: estudianteGuardado,
        matricula
    };
}

}
