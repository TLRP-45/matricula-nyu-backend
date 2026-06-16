import { Test, TestingModule } from '@nestjs/testing';
import { MatriculaController } from '../../modules/matricula/matricula.controller';
import { MatriculaService } from '../../modules/matricula/matricula.service';

describe('MatriculaController', () => {
  let controller: MatriculaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatriculaController],
      providers: [{provide: MatriculaService, useValue: {}}]
    }).compile();

    controller = module.get<MatriculaController>(MatriculaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
