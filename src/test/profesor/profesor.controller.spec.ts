import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { ProfesorController } from '../../modules/profesor/profesor.controller';

describe('ProfesorController', () => {
  let controller: ProfesorController;
  let module: TestingModule;

  let profesorID: number;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<ProfesorController>(ProfesorController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('CRUD Profesor', () => {

    it('debería crear un profesor', async () => {
      const profesor = await controller.create({
        nombre: 'PROFESOR JEST',
        apellido: 'loquisimo',
        email: 'popan@gmail.com'
      });

      profesorID = profesor.ID_profesor;

      expect(profesor).toBeDefined();
      expect(profesor.ID_profesor).toBeGreaterThan(0);
      expect(profesor.nombre).toBe('PROFESOR JEST');
    });

    it('debería obtener todos los profesores', async () => {
      const profesores = await controller.getAll();

      expect(profesores.length).toBeGreaterThan(0);
    });

    it('debería obtener un profesor por ID', async () => {
      const profesor = await controller.getOne(profesorID);

      expect(profesor.ID_profesor).toBe(profesorID);
      expect(profesor.nombre).toBe('PROFESOR JEST');
    });

    it('debería actualizar un profesor', async () => {
      const profesor = await controller.update(profesorID, {
        nombre: 'PROFESOR MODIFICADO',
      });

      expect(profesor.nombre).toBe('PROFESOR MODIFICADO');
    });

    it('debería eliminar un profesor', async () => {
      const resp = await controller.delete(profesorID);

      expect(resp.message).toContain('eliminado correctamente');
    });

  });
});