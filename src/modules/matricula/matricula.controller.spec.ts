import { Test, TestingModule } from '@nestjs/testing';
import { MatriculaController } from './matricula.controller';
import { MatriculaService } from './matricula.service';
import { matriculaActivaFixture} from '../../../test/fixtures/matricula.fixture';
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
 *  Testing: 
 *   npx jest src/modules/matricula/oferta.controller.spec.ts
 */

describe('MatriculaController', () => {

    let controller: MatriculaController;
    let mockMatriculaService;

    beforeEach(async () => {

        mockMatriculaService = {

            getAllMatriculas: jest.fn(),

            getMatricula: jest.fn(),

            create: jest.fn(),

            testCreate: jest.fn(),

            update: jest.fn(),

            delete: jest.fn(),

        };

        const module: TestingModule =
            await Test.createTestingModule({

                controllers: [MatriculaController],

                providers: [

                    {

                        provide: MatriculaService,

                        useValue: mockMatriculaService

                    }

                ]

            }).compile();

        controller =
            module.get<MatriculaController>(MatriculaController);

    });

    it('debería estar definido', () => {

        expect(controller).toBeDefined();

    });

    describe('getAllMatriculas', () => {

        it('debería retornar todas las matrículas', async () => {

            mockMatriculaService.getAllMatriculas
                .mockResolvedValue([matriculaActivaFixture]);

            const resultado =
                await controller.getAllMatriculas();

            expect(resultado)
                .toEqual([matriculaActivaFixture]);

            expect(mockMatriculaService.getAllMatriculas)
                .toHaveBeenCalled();

        });

    });

    describe('getMatricula', () => {

        it('debería retornar una matrícula', async () => {

            mockMatriculaService.getMatricula
                .mockResolvedValue(matriculaActivaFixture);

            const resultado =
                await controller.getMatricula(1);

            expect(resultado)
                .toEqual(matriculaActivaFixture);

            expect(mockMatriculaService.getMatricula)
                .toHaveBeenCalledWith(1);

        });

    });

    describe('postMatricula', () => {

        it('debería crear una matrícula', async () => {

            mockMatriculaService.create
                .mockResolvedValue(matriculaActivaFixture);

            const resultado =
                await controller.postMatricula(matriculaDTOFixture);

            expect(resultado)
                .toEqual(matriculaActivaFixture);

            expect(mockMatriculaService.create)
                .toHaveBeenCalledWith(matriculaDTOFixture);

        });

    });

    describe('postMatriculaTest', () => {

        it('debería ejecutar testCreate', async () => {

            mockMatriculaService.testCreate
                .mockResolvedValue(matriculaActivaFixture);

            const resultado =
                await controller.postMatriculaTest(matriculaDTOFixture);

            expect(resultado)
                .toEqual(matriculaActivaFixture);

            expect(mockMatriculaService.testCreate)
                .toHaveBeenCalledWith(matriculaDTOFixture);

        });

    });

    describe('updateMatricula', () => {

        it('debería actualizar una matrícula', async () => {

            const dto = {

                semestre: 2

            };

            mockMatriculaService.update
                .mockResolvedValue({

                    affected: 1

                });

            const resultado =
                await controller.updateMatricula(1, dto);

            expect(resultado)
                .toEqual({

                    affected: 1

                });

            expect(mockMatriculaService.update)
                .toHaveBeenCalledWith(1, dto);

        });

    });

    describe('deleteMatricula', () => {

        it('debería eliminar una matrícula', async () => {

            mockMatriculaService.delete
                .mockResolvedValue({

                    affected: 1

                });

            const resultado =
                await controller.deleteMatricula(1);

            expect(resultado)
                .toEqual({

                    affected: 1

                });

            expect(mockMatriculaService.delete)
                .toHaveBeenCalledWith(1);

        });

    });

});
