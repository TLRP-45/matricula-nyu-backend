import { Test, TestingModule } from '@nestjs/testing';
import { BloqueHorarioController } from '../../modules/bloque-horario/bloque-horario.controller';
import { BloqueHorarioService } from '../../modules/bloque-horario/bloque-horario.service';

describe('BloqueHorarioController', () => {
  let controller: BloqueHorarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BloqueHorarioController],
      providers: [{provide: BloqueHorarioService, useValue: {}}]
    }).compile();

    controller = module.get<BloqueHorarioController>(BloqueHorarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
