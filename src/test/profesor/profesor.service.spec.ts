import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

import { ProfesorService } from '../../modules/profesor/profesor.service';
import { ProfesorEntity } from '../../modules/profesor/profesor.entity';

describe('ProfesorService', () => {
  let service: ProfesorService;

  const profesorRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    softDelete: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfesorService,
        {
          provide: getRepositoryToken(ProfesorEntity),
          useValue: profesorRepository,
        },
      ],
    }).compile();

    service = module.get<ProfesorService>(ProfesorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('debería obtener todos los profesores', async () => {
      const profesores = [
        { ID_profesor: 1, nombre: 'Juan' },
        { ID_profesor: 2, nombre: 'María' },
      ];

      profesorRepository.find.mockResolvedValue(profesores);

      const result = await service.findAll();

      expect(result).toEqual(profesores);
      expect(profesorRepository.find).toHaveBeenCalledWith({
        relations: ['clases'],
      });
    });
  });

  describe('findOne', () => {
    it('debería obtener un profesor por ID', async () => {
      const profesor = {
        ID_profesor: 1,
        nombre: 'Juan',
      };

      profesorRepository.findOne.mockResolvedValue(profesor);

      const result = await service.findOne(1);

      expect(result).toEqual(profesor);
      expect(profesorRepository.findOne).toHaveBeenCalledWith({
        where: { ID_profesor: 1 },
        relations: ['clases'],
      });
    });

    it('debería lanzar NotFoundException si no existe', async () => {
      profesorRepository.findOne.mockResolvedValue(null);

      await expect(
        service.findOne(1),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('debería crear un profesor', async () => {
      const dto = {
        nombre: 'Juan',
        apellido: 'Pérez',
        email: 'popen@gmail.com'
      };

      profesorRepository.create.mockReturnValue(dto);
      profesorRepository.save.mockResolvedValue({
        ID_profesor: 1,
        ...dto,
      });

      const result = await service.create(dto);

      expect(profesorRepository.create).toHaveBeenCalledWith(dto);
      expect(profesorRepository.save).toHaveBeenCalled();
      expect(result.ID_profesor).toBe(1);
    });
  });

  describe('update', () => {
    it('debería actualizar un profesor', async () => {
      const profesor = {
        ID_profesor: 1,
        nombre: 'Juan',
      };

      profesorRepository.findOne.mockResolvedValue(profesor);

      profesorRepository.save.mockResolvedValue({
        ...profesor,
        nombre: 'Pedro',
      });

      const result = await service.update(1, {
        nombre: 'Pedro',
      });

      expect(profesorRepository.save).toHaveBeenCalled();
      expect(result.nombre).toBe('Pedro');
    });

    it('debería lanzar NotFoundException si el profesor no existe', async () => {
      profesorRepository.findOne.mockResolvedValue(null);

      await expect(
        service.update(1, {
          nombre: 'Pedro',
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('debería eliminar un profesor', async () => {
      profesorRepository.softDelete.mockResolvedValue({
        affected: 1,
      });

      await service.remove(1);

      expect(profesorRepository.softDelete).toHaveBeenCalledWith(1);
    });
  });
});