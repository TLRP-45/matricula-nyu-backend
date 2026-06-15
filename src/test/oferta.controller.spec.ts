import { Test, TestingModule } from '@nestjs/testing';
import { OfertaController } from '../modules/oferta/oferta.controller';

describe('OfertaController', () => {
  let controller: OfertaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfertaController],
    }).compile();

    controller = module.get<OfertaController>(OfertaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
