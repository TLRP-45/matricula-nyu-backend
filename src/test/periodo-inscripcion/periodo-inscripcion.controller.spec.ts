import { Test, TestingModule } from '@nestjs/testing';
import { PeriodoInscripcionController } from '../../modules/periodo-inscripcion/periodo-inscripcion.controller';
import { PeriodoInscripcionService } from '../../modules/periodo-inscripcion/periodo-inscripcion.service';

describe('PeriodoInscripcionController', () => {
  let controller: PeriodoInscripcionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeriodoInscripcionController],
      providers: [{provide: PeriodoInscripcionService, useValue: {}}]
    }).compile();

    controller = module.get<PeriodoInscripcionController>(PeriodoInscripcionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
