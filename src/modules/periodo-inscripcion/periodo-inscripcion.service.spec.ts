import { Test, TestingModule } from '@nestjs/testing';
import { PeriodoInscripcionService } from './periodo-inscripcion.service';

describe('PeriodoInscripcionService', () => {
  let service: PeriodoInscripcionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeriodoInscripcionService],
    }).compile();

    service = module.get<PeriodoInscripcionService>(PeriodoInscripcionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
