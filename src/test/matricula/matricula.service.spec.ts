import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';

import { MatriculaService } from '../../modules/matricula/matricula.service';
import { MatriculaEntity } from '../../modules/matricula/matricula.entity';
import { CarreraEntity } from '../../modules/carrera/carrera.entity';
import { PlazoMatricula } from '../../modules/plazo-matricula/plazo-matricula.entity';
import { UsuarioEntity } from '../../modules/usuario/usuario.entity';

import { CarreraService } from '../../modules/carrera/carrera.service';
import { PlazoMatriculaService } from '../../modules/plazo-matricula/plazo-matricula.service';
import { EstadoOMatricula } from '../../modules/matricula/matricula-estado.enum';

describe('MatriculaService', () => {
  let service: MatriculaService;

  const matriculaRepo = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    findOneByOrFail: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  const carreraRepo = {
    save: jest.fn(),
  };

  const plazoRepo = {};

  const estudianteRepo = {
    findOneBy: jest.fn(),
  };

  const carreraService = {
    getCarrera: jest.fn(),
  };

  const plazoService = {
    getLastPlazo: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatriculaService,

        {
          provide: getRepositoryToken(MatriculaEntity),
          useValue: matriculaRepo,
        },

        {
          provide: getRepositoryToken(CarreraEntity),
          useValue: carreraRepo,
        },

        {
          provide: getRepositoryToken(PlazoMatricula),
          useValue: plazoRepo,
        },

        {
          provide: getRepositoryToken(UsuarioEntity),
          useValue: estudianteRepo,
        },

        {
          provide: CarreraService,
          useValue: carreraService,
        },

        {
          provide: PlazoMatriculaService,
          useValue: plazoService,
        },
      ],
    }).compile();

    service = module.get<MatriculaService>(MatriculaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllMatriculas', () => {
    it('debería obtener todas las matrículas', async () => {
      const matriculas = [
        { ID_matricula: 1 },
        { ID_matricula: 2 },
      ];

      matriculaRepo.find.mockResolvedValue(matriculas);

      const result = await service.getAllMatriculas();

      expect(result).toEqual(matriculas);
      expect(matriculaRepo.find).toHaveBeenCalled();
    });
  });

  describe('getMatricula', () => {
    it('debería obtener una matrícula', async () => {
      const matricula = {
        ID_matricula: 1,
      };

      matriculaRepo.findOneByOrFail.mockResolvedValue(matricula);

      const result = await service.getMatricula(1);

      expect(result).toEqual(matricula);
    });

    it('debería lanzar NotFoundException', async () => {
      matriculaRepo.findOneByOrFail.mockRejectedValue(new Error());

      await expect(
        service.getMatricula(1),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('testCreate', () => {
    it('debería crear una matrícula', async () => {
      const carrera = {
        id_carrera: 1,
        cupos: 5,
      };

      const estudiante = {
        ID_estudiante: 10,
      };

      const dto = {
        semestre: 1,
        ID_carrera: 1,
        ID_estudiante: 10,
        estado: EstadoOMatricula.ACTIVA
      };

      carreraService.getCarrera.mockResolvedValue(carrera);
      estudianteRepo.findOneBy.mockResolvedValue(estudiante);

      matriculaRepo.create.mockReturnValue(dto);
      matriculaRepo.save.mockResolvedValue(dto);

      const result = await service.testCreate(dto);

      expect(result).toEqual(dto);

      expect(carreraRepo.save).toHaveBeenCalled();
    });

    it('debería lanzar NotFoundException si la carrera no existe', async () => {
      carreraService.getCarrera.mockResolvedValue(null);

      await expect(
        service.testCreate({
          semestre: 1,
          ID_carrera: 1,
          ID_estudiante: 1,
          estado: EstadoOMatricula.ACTIVA
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('debería lanzar BadRequestException si no hay cupos', async () => {
      carreraService.getCarrera.mockResolvedValue({
        cupos: 0,
      });

      await expect(
        service.testCreate({
          semestre: 1,
          ID_carrera: 1,
          ID_estudiante: 1,
          estado: EstadoOMatricula.ACTIVA
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('debería lanzar NotFoundException si el estudiante no existe', async () => {
      carreraService.getCarrera.mockResolvedValue({
        cupos: 5,
      });

      estudianteRepo.findOneBy.mockResolvedValue(null);

      await expect(
        service.testCreate({
          semestre: 1,
          ID_carrera: 1,
          ID_estudiante: 1,
          estado: EstadoOMatricula.ACTIVA
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('debería actualizar una matrícula', async () => {
      matriculaRepo.update.mockResolvedValue({
        affected: 1,
      });

      await service.update(1, {});

      expect(matriculaRepo.update).toHaveBeenCalled();
    });

    it('debería lanzar NotFoundException', async () => {
      matriculaRepo.update.mockResolvedValue({
        affected: 0,
      });

      await expect(
        service.update(1, {}),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('debería eliminar una matrícula', async () => {
      matriculaRepo.softDelete.mockResolvedValue({
        affected: 1,
      });

      await service.delete(1);

      expect(matriculaRepo.softDelete).toHaveBeenCalledWith(1);
    });

    it('debería lanzar NotFoundException', async () => {
      matriculaRepo.softDelete.mockResolvedValue({
        affected: 0,
      });

      await expect(
        service.delete(1),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('desactivar', () => {
    it('debería desactivar una matrícula', async () => {
      const matricula = {
        ID_matricula: 1,
      };

      matriculaRepo.findOneBy.mockResolvedValue(matricula);
      matriculaRepo.save.mockResolvedValue(matricula);

      await service.desactivar(1);

      expect(matriculaRepo.save).toHaveBeenCalled();
    });

    it('debería lanzar NotFoundException', async () => {
      matriculaRepo.findOneBy.mockResolvedValue(null);

      await expect(
        service.desactivar(1),
      ).rejects.toThrow(NotFoundException);
    });
  });
});