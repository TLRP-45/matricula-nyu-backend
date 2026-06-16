import { Test, TestingModule } from '@nestjs/testing';
import { PlazoMatriculaController } from '../../modules/plazo-matricula/plazo-matricula.controller';
import { PlazoMatriculaService } from '../../modules/plazo-matricula/plazo-matricula.service';

describe('PlazoMatriculaController', () => {
  let controller: PlazoMatriculaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlazoMatriculaController],
      providers: [{provide: PlazoMatriculaService, useValue: {}}]
    }).compile();

    controller = module.get<PlazoMatriculaController>(PlazoMatriculaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
