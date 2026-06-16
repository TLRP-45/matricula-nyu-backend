import { Test, TestingModule } from '@nestjs/testing';
import { CarreraService } from '../../modules/carrera/carrera.service';
import { AsignaturaService } from '../../modules/asignatura/asignatura.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MatriculaEntity } from '../../modules/matricula/matricula.entity';
import { CarreraTieneAsignaturaEntity } from '../../modules/carrera/carrera-tiene-asignatura.entity';
import { CarreraEntity } from '../../modules/carrera/carrera.entity';

describe('CarreraService', () => {
  let service: CarreraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{provide: CarreraService, useValue: {}},
        {provide: AsignaturaService, useValue: {}},
        {provide: getRepositoryToken(MatriculaEntity), useValue: {}},
        {provide: getRepositoryToken(CarreraTieneAsignaturaEntity), useValue: {}},
        {provide: getRepositoryToken(CarreraEntity), useValue: {}}
      ],
    }).compile();

    service = module.get<CarreraService>(CarreraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
