import { Test, TestingModule } from '@nestjs/testing';
import { CarreraController } from '../../modules/carrera/carrera.controller';
import { CarreraService } from '../../modules/carrera/carrera.service';
import { AsignaturaService } from '../../modules/asignatura/asignatura.service';

describe('CarreraController', () => {
  let controller: CarreraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarreraController],
      providers: [{provide: CarreraService, useValue: {}},
        {provide: AsignaturaService, useValue: {}}
      ]
    }).compile();

    controller = module.get<CarreraController>(CarreraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
