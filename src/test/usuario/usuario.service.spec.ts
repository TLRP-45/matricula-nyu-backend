import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EstudianteService } from '../../modules/usuario/usuario.service';
import { EstudianteTomaOfertaEntity}  from '../../modules/usuario/estudiante-toma-oferta.entity';
import { UsuarioEntity } from '../../modules/usuario/usuario.entity';

describe('EstudianteService', () => {
  let service: EstudianteService;

  let tomaRepo: jest.Mocked<Repository<EstudianteTomaOfertaEntity>>;
  let estudianteRepo: jest.Mocked<Repository<UsuarioEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstudianteService,
        {
          provide: getRepositoryToken(EstudianteTomaOfertaEntity),
          useValue: {
            createQueryBuilder: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UsuarioEntity),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    tomaRepo = module.get(getRepositoryToken(EstudianteTomaOfertaEntity));
    estudianteRepo = module.get(getRepositoryToken(UsuarioEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('buscarTomaPorAsignatura', () => {
    it('debería retornar tomas por asignatura', async () => {
      const mockResult = [{ id: 1 }];

      const qb: any = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockResult),
      };

      (tomaRepo.createQueryBuilder as jest.Mock).mockReturnValue(qb);

      const result = await service.buscarTomaPorAsignatura(10);

      expect(result).toEqual(mockResult);
      expect(tomaRepo.createQueryBuilder).toHaveBeenCalled();
    });
  });

  describe('horarioPorEstudiante', () => {
    it('debería lanzar NotFoundException si no existe estudiante', async () => {
      (estudianteRepo.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        service.horarioPorEstudiante(1),
      ).rejects.toThrow('Estudiante no encontrado');
    });

    it('debería lanzar InternalServerErrorException si no hay tomas', async () => {
      (estudianteRepo.findOne as jest.Mock).mockResolvedValue({
        ID_estudiante: 1,
        toma: null,
      } as any);

      await expect(
        service.horarioPorEstudiante(1),
      ).rejects.toThrow('Falla en la base de datos');
    });

    it('debería retornar horarios correctamente', async () => {
      (estudianteRepo.findOne as jest.Mock).mockResolvedValue({
        ID_estudiante: 1,
        toma: [
          {
            oferta: {
              horarios: [{ id: 1 }, { id: 2 }],
            },
          },
        ],
      } as any);

      const result = await service.horarioPorEstudiante(1);

      expect(result).toEqual([{ id: 1 }, { id: 2 }]);
    });
  });
});