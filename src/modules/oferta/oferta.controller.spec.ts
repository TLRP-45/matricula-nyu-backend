import { Test, TestingModule } from '@nestjs/testing';
import { OfertaController } from './oferta.controller';
import { OfertaService } from './oferta.service';
import { CreateOfertaDTO } from './dto/create-oferta.dto';

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
 * Testing: 
 *   npx jest src/modules/oferta/oferta.controller.spec.ts
 */

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