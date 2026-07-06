import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

import { PeriodoInscripcionService } from '../../modules/periodo-inscripcion/periodo-inscripcion.service';
import { PeriodoInscripcionEntity } from '../../modules/periodo-inscripcion/preiodo-inscripcion.entity';

describe('PeriodoInscripcionService', () => {
  let service: PeriodoInscripcionService;

  const periodoRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    softDelete: jest.fn(),
    restore: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PeriodoInscripcionService,
        {
          provide: getRepositoryToken(PeriodoInscripcionEntity),
          useValue: periodoRepository,
        },
      ],
    }).compile();

    service = module.get<PeriodoInscripcionService>(
      PeriodoInscripcionService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('dentroDelPeriodo', () => {
    it('debería retornar true si la fecha está dentro del período', async () => {
      periodoRepository.findOne.mockResolvedValue({
        inicio: new Date('2025-01-01'),
        final: new Date('2025-01-31'),
      });

      const result = await service.dentroDelPeriodo(
        new Date('2025-01-15'),
        1,
      );

      expect(result).toBe(true);
    });

    it('debería retornar false si la fecha está fuera del período', async () => {
      periodoRepository.findOne.mockResolvedValue({
        inicio: new Date('2025-01-01'),
        final: new Date('2025-01-31'),
      });

      const result = await service.dentroDelPeriodo(
        new Date('2025-02-10'),
        1,
      );

      expect(result).toBe(false);
    });

    it('debería lanzar NotFoundException si el período no existe', async () => {
      periodoRepository.findOne.mockResolvedValue(null);

      await expect(
        service.dentroDelPeriodo(new Date(), 1),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('debería obtener todos los períodos', async () => {
      const periodos = [
        { ID_periodo: 1 },
        { ID_periodo: 2 },
      ];

      periodoRepository.find.mockResolvedValue(periodos);

      const result = await service.findAll();

      expect(result).toEqual(periodos);
      expect(periodoRepository.find).toHaveBeenCalledWith({
        relations: ['ofertas'],
      });
    });
  });

  describe('findOne', () => {
    it('debería obtener un período', async () => {
      const periodo = {
        ID_periodo: 1,
      };

      periodoRepository.findOne.mockResolvedValue(periodo);

      const result = await service.findOne(1);

      expect(result).toEqual(periodo);
    });

    it('debería lanzar NotFoundException', async () => {
      periodoRepository.findOne.mockResolvedValue(null);

      await expect(
        service.findOne(1),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('debería crear un período', async () => {
      const dto = {
        inicio: (new Date()).toDateString(),
        final: (new Date()).toDateString(),
      };

      periodoRepository.create.mockReturnValue(dto);
      periodoRepository.save.mockResolvedValue(dto);

      const result = await service.create(dto);

      expect(periodoRepository.create).toHaveBeenCalledWith(dto);
      expect(periodoRepository.save).toHaveBeenCalled();
      expect(result).toEqual(dto);
    });
  });

  describe('update', () => {
    it('debería actualizar un período', async () => {
      const periodo = {
        ID_periodo: 1,
        inicio: new Date(),
        final: new Date(),
      };

      periodoRepository.findOne.mockResolvedValue(periodo);
      periodoRepository.save.mockResolvedValue({
        ...periodo,
        final: new Date('2030-01-01'),
      });

      const result = await service.update(1, {
        final: (new Date('2030-01-01')).toDateString(),
      });

      expect(periodoRepository.save).toHaveBeenCalled();
      expect(result.final).toEqual(new Date('2030-01-01'));
    });

    it('debería lanzar NotFoundException si el período no existe', async () => {
      periodoRepository.findOne.mockResolvedValue(null);

      await expect(
        service.update(1, {}),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('debería eliminar un período', async () => {
      periodoRepository.findOne.mockResolvedValue({
        ID_periodo: 1,
      });

      periodoRepository.softDelete.mockResolvedValue({
        affected: 1,
      });

      await service.remove(1);

      expect(periodoRepository.softDelete)
        .toHaveBeenCalledWith(1);
    });

    it('debería lanzar NotFoundException si no existe', async () => {
      periodoRepository.findOne.mockResolvedValue(null);

      await expect(
        service.remove(1),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('restore', () => {
    it('debería restaurar un período', async () => {
      periodoRepository.restore.mockResolvedValue({
        affected: 1,
      });

      await service.restore(1);

      expect(periodoRepository.restore)
        .toHaveBeenCalledWith(1);
    });

    it('debería lanzar NotFoundException si no existe', async () => {
      periodoRepository.restore.mockResolvedValue({
        affected: 0,
      });

      await expect(
        service.restore(1),
      ).rejects.toThrow(NotFoundException);
    });
  });
});