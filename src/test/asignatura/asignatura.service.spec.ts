import { Test, TestingModule } from '@nestjs/testing';
import { AsignaturaService } from '../../modules/asignatura/asignatura.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AsignaturaEntity } from '../../modules/asignatura/asignatura.entity';
import { EstudianteService } from '../../modules/usuario/usuario.service';
import { CarreraTieneAsignaturaEntity } from '../../modules/carrera/carrera-tiene-asignatura.entity';
import { MatriculaEntity } from '../../modules/matricula/matricula.entity';
import { CarreraEntity } from '../../modules/carrera/carrera.entity';
import { EstudianteTomaOfertaEntity } from '../../modules/usuario/estudiante-toma-oferta.entity';
import { UsuarioEntity } from '../../modules/usuario/usuario.entity';

describe('AsignaturaService', () => {
  let service: AsignaturaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {provide: AsignaturaService,
        useValue: {}},
        {provide: getRepositoryToken(AsignaturaEntity),
        useValue: {}},
        {provide: EstudianteService,
        useValue: {}},
        {provide: getRepositoryToken(CarreraTieneAsignaturaEntity),
        useValue: {}},
        {provide: getRepositoryToken(MatriculaEntity),
        useValue: {}},
        {provide: getRepositoryToken(CarreraEntity),
        useValue: {}},
        {provide: getRepositoryToken(EstudianteTomaOfertaEntity),
        useValue: {}},
        {provide: getRepositoryToken(UsuarioEntity),
        useValue: {}},
      ],
    }).compile();

    service = module.get<AsignaturaService>(AsignaturaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
