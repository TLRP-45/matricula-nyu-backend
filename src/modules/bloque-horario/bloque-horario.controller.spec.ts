import { Test, TestingModule } from '@nestjs/testing';
import { BloqueHorarioController } from './bloque-horario.controller';

describe('BloqueHorarioController', () => {
  let controller: BloqueHorarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BloqueHorarioController],
    }).compile();

    controller = module.get<BloqueHorarioController>(BloqueHorarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
