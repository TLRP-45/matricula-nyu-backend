import { Test, TestingModule } from '@nestjs/testing';
import { MatriculaService } from '../../modules/matricula/matricula.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CarreraEntity } from '../../modules/carrera/carrera.entity';
import { PlazoMatricula } from '../../modules/plazo-matricula/plazo-matricula.entity';
import { CarreraService } from '../../modules/carrera/carrera.service';
import { PlazoMatriculaService } from '../../modules/plazo-matricula/plazo-matricula.service';
import { UsuarioEntity } from '../../modules/usuario/usuario.entity';
import { MatriculaEntity } from '../../modules/matricula/matricula.entity';

describe('MatriculaService', () => {
  let service: MatriculaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{provide: MatriculaService, useValue: {}},
        {provide: getRepositoryToken(CarreraEntity), useValue: {}},
        {provide: getRepositoryToken(PlazoMatricula), useValue: {}},
        {provide: CarreraService, useValue: {}},
        {provide: PlazoMatriculaService, useValue: {}},
        {provide: getRepositoryToken(UsuarioEntity), useValue: {}},
        {provide: getRepositoryToken(MatriculaEntity), useValue: {}}
      ],
    }).compile();

    service = module.get<MatriculaService>(MatriculaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
