import { Test, TestingModule } from '@nestjs/testing';
import { OfertaController } from '../../modules/oferta/oferta.controller';
import { OfertaService } from '../../modules/oferta/oferta.service';
import { CreateOfertaDTO } from '../../modules/oferta/dto/create-oferta.dto';


describe('OfertaController', () => {

    let controller: OfertaController;
    let mockOfertaService;

    beforeEach(async () => {

        mockOfertaService = {

            crearOferta: jest.fn(),
            publicarOferta: jest.fn(),
            obtenerPublicadas: jest.fn(),
            editarOferta: jest.fn(),

        };

        const module: TestingModule =
            await Test.createTestingModule({

                controllers: [

                    OfertaController

                ],

                providers: [

                    {
                        provide: OfertaService,
                        useValue: mockOfertaService,
                    }

                ]

            }).compile();

        controller =
            module.get<OfertaController>(OfertaController);

    });

    it('debería estar definido', () => {

        expect(controller).toBeDefined();

    });

    describe('crear', () => {

        it('debería llamar a crearOferta', async () => {

            const dto: CreateOfertaDTO = {
            asignaturaId: 1,
            carreraId: 1,
            periodoId: 1,
            tipo: 'C',
            cupos: 30,
  
            hrs_semanales: 4,
            };

            mockOfertaService.crearOferta
                .mockResolvedValue(dto);

            const resultado =
                await controller.crear(dto);

            expect(resultado)
                .toEqual(dto);

            expect(mockOfertaService.crearOferta)
                .toHaveBeenCalledWith(dto);

        });

    });

    describe('publicar', () => {

        it('debería llamar a publicarOferta', async () => {

            mockOfertaService.publicarOferta
                .mockResolvedValue({ estado: 'PUBLICADA' });

            const resultado =
                await controller.publicar(1);

            expect(resultado.estado)
                .toBe('PUBLICADA');

            expect(mockOfertaService.publicarOferta)
                .toHaveBeenCalledWith(1);

        });

    });

    describe('obtener', () => {

        it('debería llamar a obtenerPublicadas', async () => {

            mockOfertaService.obtenerPublicadas
                .mockResolvedValue([]);

            await controller.obtener(1, 2);

            expect(mockOfertaService.obtenerPublicadas)
                .toHaveBeenCalledWith(1, 2);

        });

    });

    describe('editar', () => {

        it('debería llamar a editarOferta', async () => {

            const dto = {

                grupo: 'B'

            };

            mockOfertaService.editarOferta
                .mockResolvedValue(dto);

            const resultado =
                await controller.editar(1, dto);

            expect(resultado)
                .toEqual(dto);

            expect(mockOfertaService.editarOferta)
                .toHaveBeenCalledWith(1, dto);

        });

    });

});