import { Test, TestingModule } from '@nestjs/testing';
import { AsignaturaController } from '../../modules/asignatura/asignatura.controller';
import { AppModule } from '../../app.module';
import { AsignaturaService } from '../../modules/asignatura/asignatura.service';

describe('AsignaturaController', () => {
  let controller: AsignaturaController;
  let module: TestingModule

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [AsignaturaController],
      providers: [{provide: AsignaturaService, useValue: {}}]
    }).compile();

    controller = module.get<AsignaturaController>(AsignaturaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterAll(async () => {
    await module.close();
  });
});
