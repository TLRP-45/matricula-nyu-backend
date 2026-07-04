import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EstudianteService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity';
import { EstudianteTomaOfertaEntity } from './estudiante-toma-oferta.entity';
import { MatriculaEntity } from '../matricula/matricula.entity';
import { CarreraEntity } from '../carrera/carrera.entity';
import { CarreraTieneAsignaturaEntity } from '../carrera/carrera-tiene-asignatura.entity';
import { OfertaEntity } from '../oferta/oferta.entity';
import { NotFoundException } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

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
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
        };

        mockMatriculaRepo = {
            create: jest.fn(),
            save: jest.fn(),
        };

        mockCarreraRepo = {
            findOne: jest.fn(),
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

        mockUsuarioRepo.findOne.mockResolvedValue({

            ID_estudiante: 1,
            email: 'pedro@gmail.com'

        });

        const dto = {

            nombre: 'Pedro',
            apellido: 'Perez',
            email: 'pedro@gmail.com',
            rol: 0,

            rut: '11111111-1',
            nacionalidad: 'CHILENA',
            sexo: 'M',

            nacimiento: '2000-01-01',

            direccion: 'Arica',

            telefono: '999999999',

            password: '123456'

        };

        await expect(

            service.registrar(dto)

        ).rejects.toThrow(BadRequestException);

    });

});


});


