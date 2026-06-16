import { Test, TestingModule } from '@nestjs/testing';
import { ProfesorService } from '../../modules/profesor/profesor.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProfesorEntity } from '../../modules/profesor/profesor.entity';

describe('ProfesorService', () => {
  let service: ProfesorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{provide: ProfesorService, useValue: {}},
        {provide: getRepositoryToken(ProfesorEntity), useValue: {}}
      ],
    }).compile();

    service = module.get<ProfesorService>(ProfesorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
