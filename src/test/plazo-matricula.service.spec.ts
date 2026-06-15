import { Test, TestingModule } from '@nestjs/testing';
import { PlazoMatriculaService } from './plazo-matricula.service';

describe('PlazoMatriculaService', () => {
  let service: PlazoMatriculaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlazoMatriculaService],
    }).compile();

    service = module.get<PlazoMatriculaService>(PlazoMatriculaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
