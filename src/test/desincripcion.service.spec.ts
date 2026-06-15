import { Test, TestingModule } from '@nestjs/testing';
import { DesincripcionService } from './desincripcion.service';

describe('DesincripcionService', () => {
  let service: DesincripcionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DesincripcionService],
    }).compile();

    service = module.get<DesincripcionService>(DesincripcionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
