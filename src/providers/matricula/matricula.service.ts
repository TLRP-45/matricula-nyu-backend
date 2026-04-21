import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { Carrera } from 'src/database/entities/carrera.entity';
import { Matricula } from 'src/database/entities/matricula.entity';
import { PlazoMatricula } from 'src/database/entities/plazo-matricula.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CarreraService } from '../carrera/carrera.service';
import { MatriculaDTO } from 'src/controllers/matricula/dto/matricula.dto';
import { MatriculaUpdateDTO } from 'src/controllers/matricula/dto/matricula-update.dto';

@Injectable()
export class MatriculaService {
  constructor(
    @InjectRepository(Matricula)
    private readonly matriculaRepository: Repository<Matricula>,
    // @InjectRepository(Carrera)  private readonly carreraRepository: Repository<Carrera>,
    @InjectRepository(PlazoMatricula)
    private readonly plazoRepository: Repository<PlazoMatricula>,
    private carreraService: CarreraService,
  ) {}

  public async getAllMatriculas(): Promise<Matricula[]> {
    const result = await this.matriculaRepository.find();

    return result;
  }

  public async getMatricula(id: number): Promise<Matricula> {
    try {
      const result = await this.matriculaRepository.findOneByOrFail({ id: id });

      return result;
    }
    catch (error: any) {
      throw new NotFoundException('Matrícula no encontrada');
    }
  }

  public async create(matricula: MatriculaDTO): Promise<Matricula> {
    // TODO: Integrar con el sistema de pagos, revisar si existe deuda
    // TODO: Definir bien cómo se designan los plazos
    // Revisar si se está dentro del plazo
    const now = new Date();
    const plazo = await this.plazoRepository.findOneBy({ id: 1 });
    if (!plazo) {
      throw new NotFoundException('No existe un plazo definido');
    }

    if (!(now >= plazo.inicio && now <= plazo.fin)) {
      throw new UnauthorizedException('Proceso de matrícula fuera de plazo');
    }

    // Buscar la carrera asociada
    // const carrera = await this.carreraRepository.findOneBy({ id: carreraId });
    const carrera = await this.carreraService.getCarrera(matricula.carreraId)

    if (!carrera) {
      throw new NotFoundException('Carrera no encontrada');
    }

    // TODO: Definir si cupos disponibles debe ser un atributo de carrera
    // Revisar si hay cupos disponibles
    const numeroMatriculados = await this.matriculaRepository.count({
      where: { carrera: carrera }
    })

    if (numeroMatriculados >= carrera.cupos) {
       throw new UnauthorizedException('No existen cupos disponibles para esta carrera');
    }

    // La matrícula se crea y se añade la carrera
    const result = this.matriculaRepository.create(matricula);
    result.carrera = carrera

    return await this.matriculaRepository.save(result);
  }

  public async update(id: number, matricula: MatriculaUpdateDTO): Promise<UpdateResult> {
    const result: UpdateResult = await this.matriculaRepository.update(id, matricula);

    if (result.affected == 0) {
      throw new NotFoundException('Matrícula no encontrada');
    }

    return result;
  }

  // Método que supongo útil para cancelar matrículas de estudiantes, sea por
  // expulsión o por término del período académico
  public async desactivar(id: number) {
    const matricula = await this.matriculaRepository.findOneBy({ id: id });

    if (!matricula) {
      throw new NotFoundException('Matrícula no encontrada');
    }

    matricula.activa = false;

    this.matriculaRepository.save(matricula);
  }
}
