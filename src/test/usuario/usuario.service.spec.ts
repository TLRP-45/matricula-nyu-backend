import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EstudianteService } from '../../modules/usuario/usuario.service';
import { UsuarioEntity } from '../../modules/usuario/usuario.entity';
import { EstudianteTomaOfertaEntity } from '../../modules/usuario/estudiante-toma-oferta.entity';
import { MatriculaEntity } from '../../modules/matricula/matricula.entity';
import { CarreraEntity } from '../../modules/carrera/carrera.entity';
import { CarreraTieneAsignaturaEntity } from '../../modules/carrera/carrera-tiene-asignatura.entity';
import { OfertaEntity } from '../../modules/oferta/oferta.entity';
import { NotFoundException } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { administradorFixture } from '../../../test/fixtures/usuario.fixture';
import { asignaturaFixture } from '../../../test/fixtures/asignatura.fixture';
import { ofertaFixture } from '../../../test/fixtures/oferta.fixture';



describe('UsuarioService', () => {
    let service: EstudianteService;
    let mockTomaRepo;
    let mockUsuarioRepo;
    let mockMatriculaRepo;
    let mockCarreraRepo;
    let mockCarreraAsignaturaRepo;
    let mockOfertaRepo;
    beforeEach(async () => {

        mockTomaRepo = {
            findOne: jest.fn(),
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            createQueryBuilder: jest.fn(),
        };

        mockUsuarioRepo = {
            findOne: jest.fn(),
            save: jest.fn(),
            create: jest.fn().mockImplementation((dto) => dto),
        };

        mockMatriculaRepo = {
            create: jest.fn(),
            save: jest.fn(),
        };

        mockCarreraRepo = {
            findOne: jest.fn(),
            save: jest.fn(),
        };

        mockCarreraAsignaturaRepo = {
            find: jest.fn(),
        };

        mockOfertaRepo = {
            findOne: jest.fn(),
        };

        const module: TestingModule =
            await Test.createTestingModule({

                providers: [

                    EstudianteService,

                    {
                        provide: getRepositoryToken(EstudianteTomaOfertaEntity),
                        useValue: mockTomaRepo,
                    },

                    {
                        provide: getRepositoryToken(UsuarioEntity),
                        useValue: mockUsuarioRepo,
                    },

                    {
                        provide: getRepositoryToken(MatriculaEntity),
                        useValue: mockMatriculaRepo,
                    },

                    {
                        provide: getRepositoryToken(CarreraEntity),
                        useValue: mockCarreraRepo,
                    },

                    {
                        provide: getRepositoryToken(CarreraTieneAsignaturaEntity),
                        useValue: mockCarreraAsignaturaRepo,
                    },

                    {
                        provide: getRepositoryToken(OfertaEntity),
                        useValue: mockOfertaRepo,
                    },

                ],

            }).compile();

        service = module.get<EstudianteService>(EstudianteService);

    });

    it('debería estar definido', () => {
        expect(service).toBeDefined();
    });
//buscarTomaPorAsignatura
describe('buscarTomaPorAsignatura', () => {

    it('debería retornar las tomas encontradas', async () => {

        const resultado = [
            { ID_toma: 1 },
            { ID_toma: 2 }
        ];

        const queryBuilder = {
            leftJoinAndSelect: jest.fn().mockReturnThis(),
            where: jest.fn().mockReturnThis(),
            getMany: jest.fn().mockResolvedValue(resultado),
        };

        mockTomaRepo.createQueryBuilder.mockReturnValue(queryBuilder);

        const respuesta =
            await service.buscarTomaPorAsignatura(5);

        expect(respuesta).toEqual(resultado);

        expect(mockTomaRepo.createQueryBuilder)
            .toHaveBeenCalledWith('toma');

        expect(queryBuilder.where)
            .toHaveBeenCalled();

    });

});

//TEST HORARIO X ESTUDIANTE
describe('horarioPorEstudiante', () => {

    it('debería retornar los horarios', async () => {

        mockUsuarioRepo.findOne.mockResolvedValue({

            toma: [

                {
                    oferta: {
                        horarios: [
                            { id:1 },
                            { id:2 }
                        ]
                    }
                }

            ]

        });

        const respuesta =
            await service.horarioPorEstudiante(10);

        expect(respuesta).toEqual([
            { id:1 },
            { id:2 }
        ]);

    });

    it('debería lanzar InternalServerErrorException si no tiene ramos', async () => {

    mockUsuarioRepo.findOne.mockResolvedValue({

        toma: null

    });

    await expect(

        service.horarioPorEstudiante(10)

    ).rejects.toThrow(InternalServerErrorException);

});

});

//TEST USUARIO INEXISTENTE
it('debería lanzar NotFoundException', async () => {

    mockUsuarioRepo.findOne
        .mockResolvedValue(null);

    await expect(

        service.horarioPorEstudiante(10)

    ).rejects.toThrow(NotFoundException);

});

describe('registrar', () => {

    it('debería lanzar BadRequestException si el correo ya existe', async () => {

        mockUsuarioRepo.findOne.mockResolvedValue(administradorFixture);

        // Ambos datos son distintos a los del fixture
        const dto = {
            email: administradorFixture.email,
            nombre: 'Nuevo Nombre',
            password: '123456',
        };

        await expect(
            service.registrar(dto)
        ).rejects.toThrow(BadRequestException);

        expect(mockUsuarioRepo.save).not.toHaveBeenCalled();

    });

    it('debería lanzar BadRequestException si el RUT ya existe', async () => {
    
    mockUsuarioRepo.findOne.mockResolvedValueOnce(null) // email OK
        .mockResolvedValueOnce(administradorFixture); // rut duplicado

    const dto = {
        email: 'nuevo@email.com',
        rut: administradorFixture.rut,
        nombre: 'Nuevo',
        apellido: 'Usuario',
        password: '123456',
        rol: 0,
    };

    await expect(service.registrar(dto))
        .rejects.toThrow(BadRequestException);

    expect(mockUsuarioRepo.save).not.toHaveBeenCalled();
});

it('debería lanzar BadRequestException si el estudiante no envía carrera', async () => {

    mockUsuarioRepo.findOne.mockResolvedValue(null);

    const dto = {
        email: 'test@email.com',
        rut: '11.111.111-1',
        nombre: 'Test',
        apellido: 'User',
        password: '123456',
        rol: 1, // estudiante
        ID_carrera: null,
    };

    await expect(service.registrar(dto))
        .rejects.toThrow(BadRequestException);

    expect(mockUsuarioRepo.save).not.toHaveBeenCalled();
});

it('debería lanzar NotFoundException si la carrera no existe', async () => {

    mockUsuarioRepo.findOne.mockResolvedValue(null);
    mockCarreraRepo.findOne.mockResolvedValue(null);

    const dto = {
        email: 'test@email.com',
        rut: '11.111.111-1',
        nombre: 'Test',
        apellido: 'User',
        password: '123456',
        rol: 1,
        ID_carrera: 999,
    };

    await expect(service.registrar(dto))
        .rejects.toThrow(NotFoundException);

    expect(mockCarreraRepo.save).not.toHaveBeenCalled();
});

it('debería registrar correctamente un administrador', async () => {

    mockUsuarioRepo.findOne.mockResolvedValue(null);
    mockUsuarioRepo.save.mockResolvedValue({
        ...administradorFixture,
        ID_estudiante: 1
    });

    const dto = {
        email: 'admin@email.com',
        rut: '11.111.111-1',
        nombre: 'Admin',
        apellido: 'User',
        password: '123456',
        rol: 0,
    };

    const result = await service.registrar(dto);

    expect(result).toEqual({
        mensaje: 'Administrador registrado correctamente',
        estudiante: expect.any(Object),
    });

    expect(mockMatriculaRepo.save).not.toHaveBeenCalled();
});

it('debería registrar correctamente un estudiante', async () => {

    mockUsuarioRepo.findOne.mockResolvedValueOnce(null); // email
    mockUsuarioRepo.findOne.mockResolvedValueOnce(null); // rut

    mockCarreraRepo.findOne.mockResolvedValue({ id_carrera: 1 });

    mockUsuarioRepo.save.mockResolvedValue({
        ID_estudiante: 1,
    });

    mockMatriculaRepo.save.mockResolvedValue({
        id: 1,
    });

    mockCarreraAsignaturaRepo.find.mockResolvedValue([]);

    const dto = {
        email: 'est@email.com',
        rut: '11.111.111-1',
        nombre: 'Est',
        apellido: 'User',
        password: '123456',
        rol: 1,
        ID_carrera: 1,
    };

    const result = await service.registrar(dto);

    expect(result).toHaveProperty('mensaje');
    expect(result).toHaveProperty('estudiante');
    expect(result).toHaveProperty('matricula');
});

it('debería crear la matrícula inicial', async () => {

    mockUsuarioRepo.findOne.mockResolvedValueOnce(null);
    mockUsuarioRepo.findOne.mockResolvedValueOnce(null);

    mockCarreraRepo.findOne.mockResolvedValue({ id_carrera: 1 });

    mockUsuarioRepo.save.mockResolvedValue({ ID_estudiante: 1 });

    mockMatriculaRepo.save.mockResolvedValue({ id: 1 });

    mockCarreraAsignaturaRepo.find.mockResolvedValue([]);

    const dto = {
        email: 'est@email.com',
        rut: '11.111.111-1',
        nombre: 'Est',
        apellido: 'User',
        password: '123456',
        rol: 1,
        ID_carrera: 1,
    };

    await service.registrar(dto);

    expect(mockMatriculaRepo.save).toHaveBeenCalled();
});

it('debería inscribir asignaturas del primer semestre', async () => {

    mockUsuarioRepo.findOne.mockResolvedValueOnce(null);
    mockUsuarioRepo.findOne.mockResolvedValueOnce(null);

    mockCarreraRepo.findOne.mockResolvedValue({ id_carrera: 1 });

    mockUsuarioRepo.save.mockResolvedValue({ ID_estudiante: 1 });

    mockMatriculaRepo.save.mockResolvedValue({ id: 1 });

    mockCarreraAsignaturaRepo.find.mockResolvedValue(asignaturaFixture);

    mockOfertaRepo.findOne.mockResolvedValue(ofertaFixture);

    mockTomaRepo.save.mockResolvedValue({});

    const dto = {
        email: 'est@email.com',
        rut: '11.111.111-1',
        nombre: 'Est',
        apellido: 'User',
        password: '123456',
        rol: 1,
        ID_carrera: 1,
    };

    await service.registrar(dto);

    expect(mockTomaRepo.save).toHaveBeenCalled();
});
});
});

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
 */