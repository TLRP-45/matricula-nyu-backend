import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

import { PlazoMatriculaService } from '../../modules/plazo-matricula/plazo-matricula.service';
import { PlazoMatricula } from '../../modules/plazo-matricula/plazo-matricula.entity';

describe('PlazoMatriculaService', () => {
  let service: PlazoMatriculaService;

  const plazoRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlazoMatriculaService,
        {
          provide: getRepositoryToken(PlazoMatricula),
          useValue: plazoRepo,
        },
      ],
    }).compile();

    service = module.get<PlazoMatriculaService>(PlazoMatriculaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPlazos', () => {
    it('debería obtener todos los plazos', async () => {
      const plazos = [
        { id: 1 },
        { id: 2 },
      ];

      plazoRepo.find.mockResolvedValue(plazos);

      const result = await service.getPlazos();

      expect(result).toEqual(plazos);
      expect(plazoRepo.find).toHaveBeenCalled();
    });

    it('debería lanzar NotFoundException si no existen plazos', async () => {
      plazoRepo.find.mockResolvedValue(null);

      await expect(
        service.getPlazos(),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getLastPlazo', () => {
    it('debería obtener el último plazo', async () => {
      const plazo = { id: 10 };

      plazoRepo.findOne.mockResolvedValue(plazo);

      const result = await service.getLastPlazo();

      expect(result).toEqual(plazo);

      expect(plazoRepo.findOne).toHaveBeenCalledWith({
        order: {
          id: 'DESC',
        },
      });
    });

    it('debería lanzar NotFoundException si no existe ningún plazo', async () => {
      plazoRepo.findOne.mockResolvedValue(null);

      await expect(
        service.getLastPlazo(),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('debería crear un plazo', async () => {
      const dto = {
        inicio: new Date(),
        fin: new Date(),
      };

      plazoRepo.create.mockReturnValue(dto);
      plazoRepo.save.mockResolvedValue(dto);

      const result = await service.create(dto);

      expect(plazoRepo.create).toHaveBeenCalledWith(dto);
      expect(plazoRepo.save).toHaveBeenCalled();
      expect(result).toEqual(dto);
    });
  });
});