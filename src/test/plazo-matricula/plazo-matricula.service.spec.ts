import { Test, TestingModule } from '@nestjs/testing';
import { PlazoMatriculaService } from '../../modules/plazo-matricula/plazo-matricula.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlazoMatricula } from '../../modules/plazo-matricula/plazo-matricula.entity';

describe('PlazoMatriculaService', () => {
  let service: PlazoMatriculaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{provide: PlazoMatriculaService, useValue: {}},
        {provide: getRepositoryToken(PlazoMatricula), useValue: {}}
      ],
    }).compile();

    service = module.get<PlazoMatriculaService>(PlazoMatriculaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
