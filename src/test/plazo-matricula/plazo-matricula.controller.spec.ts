import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { PlazoMatriculaController } from '../../modules/plazo-matricula/plazo-matricula.controller';

describe('PlazoMatriculaController', () => {
  let controller: PlazoMatriculaController;
  let module: TestingModule;

  let plazoID: number;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<PlazoMatriculaController>(PlazoMatriculaController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('CRUD Plazo Matricula', () => {

    it('debería crear un plazo de matrícula', async () => {
      const plazo = await controller.postPlazo({
        // AJUSTA ESTO SEGÚN TU DTO REAL
        fecha_inicio: '2026-01-01',
        fecha_fin: '2026-02-01',
      } as any);

      expect(plazo).toBeDefined();

      // ajusta según cómo responda tu service
      if (plazo?.id) {
        plazoID = plazo.id;
        expect(plazo.id).toBeGreaterThan(0);
      }
    });

    it('debería obtener todos los plazos de matrícula', async () => {
      const plazos = await controller.getAllPlazos();

      expect(Array.isArray(plazos)).toBe(true);
    });

  });
});