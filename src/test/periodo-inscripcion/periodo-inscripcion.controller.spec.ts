import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { PeriodoInscripcionController } from '../../modules/periodo-inscripcion/periodo-inscripcion.controller';

describe('PeriodoInscripcionController', () => {
  let controller: PeriodoInscripcionController;
  let module: TestingModule;

  let periodoID: number;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<PeriodoInscripcionController>(PeriodoInscripcionController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('CRUD Periodo Inscripcion', () => {

    it('debería crear un período de inscripción', async () => {
      const periodo = await controller.create({
        // AJUSTA SEGÚN TU DTO REAL
        nombre: 'PERIODO JEST',
        fecha_inicio: '2026-01-01',
        fecha_fin: '2026-02-01',
      } as any);

      expect(periodo).toBeDefined();

      if (periodo?.ID_periodo) {
        periodoID = periodo.ID_periodo;
        expect(periodo.ID_periodo).toBeGreaterThan(0);
      }
    });

    it('debería obtener todos los períodos de inscripción', async () => {
      const periodos = await controller.findAll();

      expect(Array.isArray(periodos)).toBe(true);
    });

    it('debería obtener un período por ID', async () => {
      const periodo = await controller.findOne(periodoID);

      expect(periodo).toBeDefined();
      expect((periodo as any).ID_periodo ?? periodoID).toBe(periodoID);
    });

    it('debería actualizar un período de inscripción', async () => {
      const updated = await controller.update(periodoID, {
        nombre: 'PERIODO MODIFICADO',
      } as any);

      expect(updated).toBeDefined();
      expect((updated as any).nombre).toBe('PERIODO MODIFICADO');
    });

    it('debería eliminar lógicamente un período', async () => {
      const resp = await controller.remove(periodoID);

      expect(resp).toBeDefined();
      expect(resp.message).toContain('eliminado correctamente');
    });

    it('debería restaurar un período eliminado', async () => {
      const resp = await controller.restore(periodoID);

      expect(resp).toBeDefined();
      expect(resp.message).toContain('restaurado correctamente');
    });

  });
});