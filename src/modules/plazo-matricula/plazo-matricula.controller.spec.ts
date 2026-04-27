import { Test, TestingModule } from '@nestjs/testing';
import { PlazoMatriculaController } from './plazo-matricula.controller';

describe('PlazoMatriculaController', () => {
  let controller: PlazoMatriculaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlazoMatriculaController],
    }).compile();

    controller = module.get<PlazoMatriculaController>(PlazoMatriculaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
