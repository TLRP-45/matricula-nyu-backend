import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteTomaOfertaEntity } from './estudiante-toma-oferta.entity';
import { UsuarioEntity } from './usuario.entity';
import { BloqueHorarioEntity } from '../bloque-horario/bloque-horario.entity';
import { EstadoToma } from './estado-toma.enum';
import { BadRequestException } from '@nestjs/common';
import { MatriculaEntity } from '../matricula/matricula.entity';
import { CarreraEntity } from '../carrera/carrera.entity';
import { CarreraTieneAsignaturaEntity } from '../carrera/carrera-tiene-asignatura.entity';
import { OfertaEntity } from '../oferta/oferta.entity';
import { RolUsuario } from './rol-usuario.enum';
import { EstadoOMatricula } from '../matricula/matricula-estado.enum';
import { RegistroUsuarioDTO } from './dto/registro.dto';
import { UsuarioExternoRespuesta } from '../auth/dto/respuesta-login.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EstudianteService {
  usuarioUrl: string = 'https://natural-generosity-production-1a76.up.railway.app'

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
    private readonly CarreraAsignaturaRepo: Repository<CarreraTieneAsignaturaEntity>,
    @InjectRepository(OfertaEntity)
    private readonly OfertaRepo: Repository<OfertaEntity>,
  ) { }

  async buscarTomaPorAsignatura(ID_asignatura: number) {
    return this.TomaRepo
      .createQueryBuilder('toma')
      .leftJoinAndSelect('toma.oferta', 'oferta')
      .leftJoinAndSelect('oferta.asignatura', 'asignatura')
      .where('asignatura.ID_asignatura = :ID_asignatura', { ID_asignatura })
      .getMany();
  }

  // horario
  async horarioPorEstudiante(ID_estudiante: number): Promise<BloqueHorarioEntity[]> {
    const estudiante = await this.EstudianteRepo.findOne({
      where: { ID_estudiante },
      relations: [
        'toma',
        'toma.oferta',
        'toma.oferta.horarios'
      ]
    });
    if (!estudiante) throw new NotFoundException('Estudiante no encontrado');

    const ramos = estudiante.toma;
    if (!ramos) throw new InternalServerErrorException('Falla en la base de datos');

    const horarios = ramos.flatMap(r => r.oferta?.horarios ?? []);
    return horarios;
  }

  /**
   * Realiza el registro en el sistema externo de usuarios.
   *
   * @param rut El RUT del usuario
   * @param nombre El nombre del usuario
   * @param apellido El apellido del usuario
   * @param correo El correo electrónico del usuario
   * @param contraseña La contraseña del usuario
   * @returns El objeto usuario con UUID, nombre, apellido e email
   */
  private async registroExterno(rut: string, nombre: string, apellido: string, correo: string, contraseña: string, genero: string):
    Promise<UsuarioExternoRespuesta> {
    const response = await fetch(this.usuarioUrl + '/v1/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rut: rut,
        firstName: nombre,
        lastName: apellido,
        gender: genero,
        email: correo,
        password: contraseña
      })
    })

    const data = await response.json();
    console.log(data)

    if (data.error) {
      throw new UnauthorizedException(data.message);
    }

    return {
      uuid: data.id,
      nombre: data.firstName,
      apellido: data.lastName,
      email: data.email,
    };
  }

  /**
   * Crea un usuario en el sistema local y externo.
   *
   * @param usuario El DTO de usuario con toda su información
   * @returns Código 200, usuario creado exitosamente.
   *
   * @throws BadRequestException Si el correo o el rut ya están registrados
   */
  async registrar(usuario: RegistroUsuarioDTO) {

    const existenteEmail = await this.EstudianteRepo.findOne({
      where: { email: usuario.email }
    });

    if (existenteEmail) {
      throw new BadRequestException(
        'El correo ya está registrado'
      );
    }

    const existenteRut = await this.EstudianteRepo.findOne({
      where: { rut: usuario.rut }
    });

    if (existenteRut) {
      throw new BadRequestException(
        'El RUT ya está registrado'
      );
    }

    let carrera: CarreraEntity | null = null;
    if (usuario.rol === RolUsuario.Estudiante) {

      if (!usuario.ID_carrera) {
        throw new BadRequestException(
          'Debe seleccionar una carrera'
        );
      }

      carrera = await this.CarreraRepo.findOne({
        where: {
          id_carrera: usuario.ID_carrera
        }
      });

      if (!carrera) {
        throw new NotFoundException(
          'Carrera no encontrada'
        );
      }
    }

    // Hashing
    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(usuario.password, salt);

    // Registro en sistema externo
    let usuarioExterno: UsuarioExternoRespuesta;

    const genero: string = usuario.sexo === 'F' ? 'Femenino' : 'Masculino'

    try {
      usuarioExterno = await this.registroExterno(
        usuario.rut,
        usuario.nombre,
        usuario.apellido,
        usuario.email,
        hashPass,
        genero
      )
    } catch (error: any) {
      if (error instanceof ConflictException) {
        throw new ForbiddenException('Email ya existe. Esto no debería pasar nunca... :(')
      } else {
        throw error;
      }
    }

    // console.log(usuarioExterno);

    const estudiante = this.EstudianteRepo.create({
      ID_externo: usuarioExterno.uuid,
      // ID_externo: '9742812e-b127-43ba-85b2-6eca1ff9e810',
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      rut: usuario.rut,
      nacionalidad: usuario.nacionalidad,
      sexo: usuario.sexo,
      nacimiento: usuario.nacimiento,
      direccion: usuario.direccion,
      telefono: usuario.telefono,
      password: hashPass,
      rol: usuario.rol === 1 ? RolUsuario.Estudiante : RolUsuario.Admin,
    });

    // estudiante.rol = usuario.rol === 1 ? RolUsuario.Estudiante : RolUsuario.Admin;

    const estudianteGuardado =
      await this.EstudianteRepo.save(estudiante);

    if (usuario.rol === RolUsuario.Admin) {
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


  async generarComprobante(idEstudiante: number) {

    const estudiante = await this.EstudianteRepo.findOne({
      where: {
        ID_estudiante: idEstudiante
      }
    });

    if (!estudiante) {
      throw new NotFoundException(
        'Estudiante no encontrado'
      );
    }

    const matricula = await this.MatriculaRepo.findOne({
      where: {
        estudiante: {
          ID_estudiante: idEstudiante
        }
      },
      relations: [
        'carrera'
      ]
    });

    const asignaturas = await this.TomaRepo.find({
      where: {
        estudiante: {
          ID_estudiante: idEstudiante
        }
      },
      relations: [
        'oferta',
        'oferta.asignatura'
      ]
    });

    return {
      fecha: new Date(),
      estudiante: {
        id: estudiante.ID_estudiante,
        nombre: estudiante.nombre,
        apellido: estudiante.apellido,
        rut: estudiante.rut
      },
      carrera: matricula?.carrera?.nombre,
      semestre: matricula?.semestre,
      asignaturas: asignaturas.map(t => ({
        codigo: t.oferta.asignatura.ID_asignatura,
        nombre: t.oferta.asignatura.nombre,
        grupo: t.oferta.grupo
      }))
    };
  }

  /**
   * Actualiza el estado de una inscripción de un estudiante en una oferta.
   *
   * Busca la toma mediante su identificador. Si no existe,
   * lanza una excepción NotFoundException.
   *
   * @param ID_toma Identificador de la toma de oferta.
   * @param estado Nuevo estado que tendrá la inscripción.
   * @returns La entidad actualizada.
   * @throws NotFoundException Si la toma no existe.
   */
  async cambiarEstado(ID_toma: number, estado: EstadoToma): Promise<EstudianteTomaOfertaEntity> {
    const toma = await this.TomaRepo.findOne({
      where: { ID_toma },
    });

    if (!toma) {
      throw new NotFoundException(
        `No existe una toma con ID ${ID_toma}`,
      );
    }

    toma.estado = estado;

    return this.TomaRepo.save(toma);
  }

}
