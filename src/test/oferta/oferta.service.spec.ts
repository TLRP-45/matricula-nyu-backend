import { Test, TestingModule } from '@nestjs/testing';
import { OfertaService } from '../../modules/oferta/oferta.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OfertaEntity } from '../../modules/oferta/oferta.entity';
import { BadRequestException,NotFoundException,} from '@nestjs/common';
import { ofertaFixture } from '../fixtures/oferta.fixture';
import { BloqueHorarioEntity } from '../../modules/bloque-horario/bloque-horario.entity';

describe('OfertaService', () => {

    let service: OfertaService;
    let mockOfertaRepo;

    beforeEach(async () => {

    mockOfertaRepo = {
        create: jest.fn(),
        save: jest.fn(),
        findOne: jest.fn(),
        find: jest.fn(),
    };

    const mockBloqueHorarioRepo = {
        create: jest.fn(),
        save: jest.fn(),
        find: jest.fn(),
        remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
        providers: [
            OfertaService,
            {
                provide: getRepositoryToken(OfertaEntity),
                useValue: mockOfertaRepo,
            },
            {
                provide: getRepositoryToken(BloqueHorarioEntity),
                useValue: mockBloqueHorarioRepo,
            },
        ],
    }).compile();

    service = module.get<OfertaService>(OfertaService);
});

    it('debería estar definido', () => {

        expect(service).toBeDefined();

    });

    describe('crearOferta', () => {

        it('debería crear una oferta correctamente', async () => {

            const dto = {

                asignaturaId: 1,
                carreraId: 1,
                periodoId: 1,

                tipo: 'C' as const,
                grupo: 'A',

                cupos: 30,
                hrs_semanales: 4,

                profesorId: 5,

                horarios: [

                    {
                        dia: 'Lunes',
                        hora: '2026-07-01T08:00:00',
                        duracion: 90,
                        lugar: 'Sala 101',
                    }

                ]

            };

            mockOfertaRepo.create.mockImplementation(
                dto => dto
            );

            mockOfertaRepo.save.mockImplementation(
                dto => Promise.resolve(dto)
            );

            const resultado =
                await service.crearOferta(dto);

            expect(resultado).toEqual(

                expect.objectContaining({
                    grupo: 'A',
                    cupos: 30,
                    hrs_semanales: 4,

                })

            );

            expect(mockOfertaRepo.create)
                .toHaveBeenCalled();

            expect(mockOfertaRepo.save)
                .toHaveBeenCalled();

        });

        it('debería crear una oferta sin profesor ni horarios', async () => {

            const dto = {

                asignaturaId: 1,
                carreraId: 1,
                periodoId: 1,

                tipo: 'L' as const,

                cupos: 20,
                hrs_semanales: 2,

            };

            mockOfertaRepo.create.mockImplementation(
                dto => dto
            );

            mockOfertaRepo.save.mockImplementation(
                dto => Promise.resolve(dto)
            );

            const resultado =
                await service.crearOferta(dto);

            expect(resultado).toBeDefined();

            expect(mockOfertaRepo.save)
                .toHaveBeenCalled();

        });

    });

    describe('publicarOferta', () => {

    it('debería lanzar NotFoundException si la oferta no existe', async () => {

        mockOfertaRepo.findOne
            .mockResolvedValue(null);

        await expect(

            service.publicarOferta(1)

        ).rejects.toThrow(NotFoundException);

    });

    it('debería lanzar BadRequestException si no tiene profesor', async () => {

        mockOfertaRepo.findOne.mockResolvedValue({

            ...ofertaFixture,

            profesor: undefined

        });

        await expect(

            service.publicarOferta(1)

        ).rejects.toThrow(BadRequestException);

    });

    it('debería publicar correctamente la oferta', async () => {

    mockOfertaRepo.findOne.mockResolvedValue({

        ...ofertaFixture,

        profesor: {
            ID_profesor: 5,
        },

        grupo: 'A',

        horarios: [
            {
                hora: new Date(),
                duracion: 90,
                lugar: 'Sala 101',
            }
        ],

    });

    mockOfertaRepo.save.mockImplementation(o => o);

    const resultado =
        await service.publicarOferta(1);

    expect(resultado.estado)
        .toBe('PUBLICADA');

    expect(mockOfertaRepo.save)
        .toHaveBeenCalled();

});

});

describe('obtenerPublicadas', () => {

    it('debería retornar las ofertas publicadas', async () => {

        mockOfertaRepo.find.mockResolvedValue([

            {
                ...ofertaFixture,
                estado: 'PUBLICADA'
            }

        ]);

        const resultado =
            await service.obtenerPublicadas(1, 1);

        expect(resultado).toHaveLength(1);

        expect(mockOfertaRepo.find)
            .toHaveBeenCalled();

    });

});

describe('cuposDisponibles', () => {

    it('debería lanzar NotFoundException si la oferta no existe', async () => {

        mockOfertaRepo.findOne
            .mockResolvedValue(null);

        await expect(

            service.cuposDisponibles(1)

        ).rejects.toThrow(NotFoundException);

    });

    it('debería retornar true si hay cupos', async () => {

        mockOfertaRepo.findOne.mockResolvedValue({

            ...ofertaFixture,

            cupos: 20

        });

        const resultado =
            await service.cuposDisponibles(1);

        expect(resultado)
            .toBe(true);

    });

    it('debería retornar false si no hay cupos', async () => {

        mockOfertaRepo.findOne.mockResolvedValue({

            ...ofertaFixture,

            cupos: 0

        });

        const resultado =
            await service.cuposDisponibles(1);

        expect(resultado)
            .toBe(false);

    });

});

describe('editarOferta', () => {

    it('debería lanzar NotFoundException si la oferta no existe', async () => {

        mockOfertaRepo.findOne.mockResolvedValue(null);

        await expect(

            service.editarOferta(1, {
                grupo: 'B'
            })

        ).rejects.toThrow(NotFoundException);

    });

    it('debería editar correctamente la oferta', async () => {

        mockOfertaRepo.findOne.mockResolvedValue({
            ...ofertaFixture
        });

        mockOfertaRepo.save.mockImplementation(o => o);

        const resultado = await service.editarOferta(1, {

            grupo: 'B',
            cupos: 40

        });

        expect(resultado.grupo).toBe('B');
        expect(resultado.cupos).toBe(40);

        expect(mockOfertaRepo.save)
            .toHaveBeenCalled();

    });

});
});
