import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from '../../modules/usuario/usuario.controller';

describe('UsuarioController', () => {
  let controller: UsuarioController;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [UsuarioController],
    }).compile();

    controller = module.get<UsuarioController>(UsuarioController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});