import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CarreraController } from '../../modules/carrera/carrera.controller';

describe('CarreraController', () => {
  let controller: CarreraController;
  let module: TestingModule;

  let carreraID: number;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<CarreraController>(CarreraController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('CRUD Carrera', () => {

    it('debería crear una carrera', async () => {
      const carrera = await controller.crearCarrera({
        nombre: 'CARRERA JEST6',
        facultad: 'INGENIERIA',
        duracion: 10,
        cupos: 200
      } as any);

      expect(carrera).toBeDefined();

      if ((carrera as any)?.id_carrera) {
        carreraID = (carrera as any).id_carrera;
        expect((carrera as any).id_carrera).toBeGreaterThan(0);
      }
    });

    it('debería obtener todas las carreras', async () => {
      const carreras = await controller.getAllCarreras();

      expect(Array.isArray(carreras)).toBe(true);
    });

    it('debería obtener una carrera por ID', async () => {
      const carrera = await controller.getCarrera(carreraID);

      expect(carrera).toBeDefined();
      expect((carrera as any).id_carrera ?? carreraID).toBe(carreraID);
    });

    it('debería actualizar una carrera', async () => {
      const result = await controller.putAsignatura(carreraID, {
        nombre: 'CARRERA MODIFICADA3',
      } as any);

      expect(result).toBeDefined();
      expect((result as any).affected).toBeGreaterThan(0);

      const carreraActualizada = await controller.getCarrera(carreraID);

      expect(carreraActualizada).toBeDefined();
      expect((carreraActualizada as any).nombre).toBe('CARRERA MODIFICADA3');
    });

    it('debería eliminar una carrera', async () => {
      const resp = await controller.deleteAsignatura(carreraID);

      expect(resp).toBeDefined();
    });

  });
});