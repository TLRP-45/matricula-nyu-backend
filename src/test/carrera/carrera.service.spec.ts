import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

import { CarreraService } from '../../modules/carrera/carrera.service';
import { CarreraEntity } from '../../modules/carrera/carrera.entity';
import { CarreraTieneAsignaturaEntity } from '../../modules/carrera/carrera-tiene-asignatura.entity';
import { MatriculaEntity } from '../../modules/matricula/matricula.entity';
import { AsignaturaService } from '../../modules/asignatura/asignatura.service';

describe('CarreraService', () => {
  let service: CarreraService;

  const carreraRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
  };

  const matriculaRepository = {
    createQueryBuilder: jest.fn(),
  };

  const ctaRepository = {
    createQueryBuilder: jest.fn(),
  };

  const asignaturaService = {};

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarreraService,

        {
          provide: getRepositoryToken(CarreraEntity),
          useValue: carreraRepository,
        },

        {
          provide: AsignaturaService,
          useValue: asignaturaService,
        },

        {
          provide: getRepositoryToken(MatriculaEntity),
          useValue: matriculaRepository,
        },

        {
          provide: getRepositoryToken(CarreraTieneAsignaturaEntity),
          useValue: ctaRepository,
        },
      ],
    }).compile();

    service = module.get<CarreraService>(CarreraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllCarreras', () => {
    it('debería obtener todas las carreras', async () => {
      const carreras = [
        { id_carrera: 1, nombre: 'Ingeniería' },
        { id_carrera: 2, nombre: 'Derecho' },
      ];

      carreraRepository.find.mockResolvedValue(carreras);

      const result = await service.getAllCarreras();

      expect(result).toEqual(carreras);
      expect(carreraRepository.find).toHaveBeenCalled();
    });
  });

  describe('getCarrera', () => {

    it('debería obtener una carrera', async () => {

      const carrera = {
        id_carrera: 1,
        nombre: 'Ingeniería'
      };

      carreraRepository.findOneBy.mockResolvedValue(carrera);

      const result = await service.getCarrera(1);

      expect(result).toEqual(carrera);

      expect(carreraRepository.findOneBy).toHaveBeenCalledWith({
        id_carrera: 1,
      });

    });

    it('debería lanzar NotFoundException', async () => {

      carreraRepository.findOneBy.mockResolvedValue(null);

      await expect(

        service.getCarrera(1)

      ).rejects.toThrow(NotFoundException);

    });

  });

  describe('create', () => {

    it('debería crear una carrera', async () => {

      const dto = {
        nombre: 'Ingeniería Civil',
        facultad: 'Ingeniería',
        duracion: 2,
        cupos: 2,
      };

      carreraRepository.create.mockReturnValue(dto);

      carreraRepository.save.mockResolvedValue(dto);

      const result = await service.create(dto);

      expect(carreraRepository.create).toHaveBeenCalledWith(dto);

      expect(carreraRepository.save).toHaveBeenCalled();

      expect(result).toEqual(dto);

    });

  });

  describe('update', () => {

    it('debería actualizar una carrera', async () => {

      carreraRepository.update.mockResolvedValue({
        affected: 1,
      });

      await service.update(1, {
        nombre: 'Ingeniería Actualizada'
      });

      expect(carreraRepository.update).toHaveBeenCalled();

    });

    it('debería lanzar NotFoundException al actualizar', async () => {

      carreraRepository.update.mockResolvedValue({
        affected: 0,
      });

      await expect(

        service.update(1, {})

      ).rejects.toThrow(NotFoundException);

    });

  });

  describe('delete', () => {

    it('debería eliminar una carrera', async () => {

      carreraRepository.softDelete.mockResolvedValue({
        affected: 1,
      });

      await service.delete(1);

      expect(carreraRepository.softDelete)
        .toHaveBeenCalledWith(1);

    });

    it('debería lanzar NotFoundException al eliminar', async () => {

      carreraRepository.softDelete.mockResolvedValue({
        affected: 0,
      });

      await expect(

        service.delete(1)

      ).rejects.toThrow(NotFoundException);

    });

  });

});