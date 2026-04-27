import { Test, TestingModule } from '@nestjs/testing';
import { PeriodoInscripcionController } from './periodo-inscripcion.controller';

describe('PeriodoInscripcionController', () => {
  let controller: PeriodoInscripcionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeriodoInscripcionController],
    }).compile();

    controller = module.get<PeriodoInscripcionController>(PeriodoInscripcionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
