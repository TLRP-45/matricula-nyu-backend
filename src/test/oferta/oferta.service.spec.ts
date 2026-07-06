import { Test, TestingModule } from '@nestjs/testing';
import { OfertaService } from '../../modules/oferta/oferta.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OfertaEntity } from '../../modules/oferta/oferta.entity';

describe('OfertaService', () => {
  let service: OfertaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{provide: OfertaService, useValue: {}},
        {provide: getRepositoryToken(OfertaEntity), useValue: {}}
      ],
    }).compile();

    service = module.get<OfertaService>(OfertaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
