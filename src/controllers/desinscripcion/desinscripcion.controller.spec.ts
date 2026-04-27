import { Test, TestingModule } from '@nestjs/testing';
import { DesinscripcionController } from './desinscripcion.controller';

describe('DesinscripcionController', () => {
  let controller: DesinscripcionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DesinscripcionController],
    }).compile();

    controller = module.get<DesinscripcionController>(DesinscripcionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
