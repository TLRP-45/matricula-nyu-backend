import { Test, TestingModule } from '@nestjs/testing';
import { BloqueHorarioService } from './bloque-horario.service';

describe('BloqueHorarioService', () => {
  let service: BloqueHorarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BloqueHorarioService],
    }).compile();

    service = module.get<BloqueHorarioService>(BloqueHorarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
