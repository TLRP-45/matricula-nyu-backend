import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MatriculaEntity } from '../matricula/matricula.entity';
import { CarreraEntity } from '../carrera/carrera.entity';
import { MatriculaService } from './matricula.service';
import { PlazoMatricula } from '../plazo-matricula/plazo-matricula.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { CarreraService } from '../carrera/carrera.service';
import { PlazoMatriculaService } from '../plazo-matricula/plazo-matricula.service';
import { matriculaActivaFixture, matriculaInactivaFixture } from '../../../test/fixtures/matricula.fixture';
import { NotFoundException, UnauthorizedException,BadRequestException } from '@nestjs/common';
import { carreraInformaticaFixture } from '../../../test/fixtures/carrera.fixture';
import { estudianteFixture } from '../../../test/fixtures/usuario.fixture';
import { matriculaDTOFixture } from '../../../test/fixtures/matricula.dto.fixture';

/**
 * 
 *   Fixtures
 *   Objetos estáticos reutilizables que representan entidades válidas del
 *   sistema. Permiten disponer de datos consistentes durante todas las
 *   pruebas sin repetir su creación.
 * 
 *   Mocks
 *   Implementaciones simuladas de repositorios, servicios y dependencias
 *   externas mediante Jest (`jest.fn()`), utilizadas para controlar el
 *   comportamiento de las llamadas y evitar el acceso a recursos reales.
 *
 *   beforeEach()
 *   Reinicializa todos los mocks y crea una nueva instancia del módulo de
 *   pruebas antes de ejecutar cada caso, garantizando independencia entre
 *   los tests.
 *
 *   describe()
 *   Agrupa las pruebas correspondientes a un mismo método del servicio o
 *   controlador para mejorar la organización y legibilidad.
 *
 *   it()
 *   Define un escenario específico que valida un comportamiento esperado,
 *   incluyendo casos exitosos y manejo de excepciones.
 * 
 *   Testing: 
 *   npx jest src/modules/matricula/matricula.service.spec.ts
 */

describe('MatriculaService', () => {

    let service: MatriculaService;
    let mockMatriculaRepo;
    let mockCarreraRepo;
    let mockPlazoRepo;
    let mockEstudianteRepo;

    let mockCarreraService;
    let mockPlazoService;

    beforeEach(async () => {

        mockMatriculaRepo = {
            find: jest.fn(),
            findOneBy: jest.fn(),
            findOneByOrFail: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            softDelete: jest.fn(),
            createQueryBuilder: jest.fn(),
        };

        mockCarreraRepo = {
            save: jest.fn(),
        };

        mockPlazoRepo = {};

        mockEstudianteRepo = {
            findOneBy: jest.fn(),
        };

        mockCarreraService = {
            getCarrera: jest.fn(),
        };

        mockPlazoService = {
            getLastPlazo: jest.fn(),
        };

        const module = await Test.createTestingModule({

            providers: [

                MatriculaService,

                {
                    provide: getRepositoryToken(MatriculaEntity),
                    useValue: mockMatriculaRepo
                },

                {
                    provide: getRepositoryToken(CarreraEntity),
                    useValue: mockCarreraRepo
                },

                {
                    provide: getRepositoryToken(PlazoMatricula),
                    useValue: mockPlazoRepo
                },

                {
                    provide: getRepositoryToken(UsuarioEntity),
                    useValue: mockEstudianteRepo
                },

                {
                    provide: CarreraService,
                    useValue: mockCarreraService
                },

                {
                    provide: PlazoMatriculaService,
                    useValue: mockPlazoService
                }

            ]

        }).compile();

        service = module.get(MatriculaService);

    });

    it('debería estar definido', () => {

    expect(service).toBeDefined();

});

describe('ultimaMatricula', () => {

    it('debería retornar la última matrícula', async () => {

        const queryBuilder = {

            leftJoin: jest.fn().mockReturnThis(),
            where: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            getOne: jest.fn().mockResolvedValue(matriculaActivaFixture)

        };

        mockMatriculaRepo.createQueryBuilder
            .mockReturnValue(queryBuilder);

        const resultado =
            await service.ultimaMatricula(2);

        expect(resultado)
            .toEqual(matriculaActivaFixture);

    });

});

describe('getAllMatriculas', () => {

    it('debería retornar todas las matrículas', async () => {

        mockMatriculaRepo.find.mockResolvedValue([

            matriculaActivaFixture,
            matriculaInactivaFixture

        ]);

        const resultado =
            await service.getAllMatriculas();

        expect(resultado).toEqual([

            matriculaActivaFixture,
            matriculaInactivaFixture

        ]);

    });
});

describe('getMatricula', () => {

    it('debería retornar una matrícula', async () => {

        mockMatriculaRepo.findOneByOrFail
            .mockResolvedValue(matriculaActivaFixture);

        const resultado =
            await service.getMatricula(1);

        expect(resultado)
            .toEqual(matriculaActivaFixture);

    });

        it('debería lanzar NotFoundException', async () => {

        mockMatriculaRepo.findOneByOrFail
            .mockRejectedValue(new Error());

        await expect(

            service.getMatricula(999)

        ).rejects.toThrow(NotFoundException);

    });

});

describe('create', () => {

    it('debería lanzar NotFoundException si no existe plazo', async () => {

        mockPlazoService.getLastPlazo.mockResolvedValue(null);

        await expect(
            service.create(matriculaDTOFixture)
        ).rejects.toThrow(NotFoundException);

    });

    it('debería lanzar UnauthorizedException fuera de plazo', async () => {

        mockPlazoService.getLastPlazo.mockResolvedValue({

            inicio: new Date("2025-01-01"),
            fin: new Date("2025-01-10")

        });

        await expect(
            service.create(matriculaDTOFixture)
        ).rejects.toThrow(UnauthorizedException);

    });

    it('debería lanzar BadRequestException si no hay cupos', async () => {

        mockPlazoService.getLastPlazo.mockResolvedValue({

            inicio: new Date("2026-01-01"),
            fin: new Date("2027-01-01")

        });

        mockCarreraService.getCarrera.mockResolvedValue({

            ...carreraInformaticaFixture,
            cupos: 0

        });

        await expect(
            service.create(matriculaDTOFixture)
        ).rejects.toThrow(BadRequestException);

    });

    it('debería lanzar NotFoundException si el estudiante no existe', async () => {

        mockPlazoService.getLastPlazo.mockResolvedValue({

            inicio: new Date("2026-01-01"),
            fin: new Date("2027-01-01")

        });

        mockCarreraService.getCarrera.mockResolvedValue({

            ...carreraInformaticaFixture

        });

        mockEstudianteRepo.findOneBy.mockResolvedValue(null);

        await expect(
            service.create({
                ...matriculaDTOFixture,
                ID_estudiante: 999
            })
        ).rejects.toThrow(NotFoundException);

    });

    it('debería crear correctamente una matrícula', async () => {

        mockPlazoService.getLastPlazo.mockResolvedValue({

            inicio: new Date("2026-01-01"),
            fin: new Date("2027-01-01")

        });

        mockCarreraService.getCarrera.mockResolvedValue({

            ...carreraInformaticaFixture

        });

        mockEstudianteRepo.findOneBy.mockResolvedValue(estudianteFixture);

        mockMatriculaRepo.create.mockImplementation(dto => dto);

        mockMatriculaRepo.save.mockResolvedValue(matriculaActivaFixture);

        const resultado = await service.create(matriculaDTOFixture);

        expect(resultado).toEqual(matriculaActivaFixture);

        expect(mockCarreraRepo.save).toHaveBeenCalled();

    });

});
});