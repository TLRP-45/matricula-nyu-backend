import { Test, TestingModule } from '@nestjs/testing';
import { PeriodoInscripcionService } from '../../modules/periodo-inscripcion/periodo-inscripcion.service';
import { PeriodoInscripcionEntity } from '../../modules/periodo-inscripcion/preiodo-inscripcion.entity';

describe('PeriodoInscripcionService', () => {
  let service: PeriodoInscripcionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{provide: PeriodoInscripcionService, useValue: {}},
        {provide: PeriodoInscripcionEntity, useValue: {}}
      ],
    }).compile();

    service = module.get<PeriodoInscripcionService>(PeriodoInscripcionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
