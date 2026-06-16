import { Test, TestingModule } from '@nestjs/testing';
import { AsignaturaController } from '../../modules/asignatura/asignatura.controller';
import { AppModule } from '../../app.module';
import { AsignaturaService } from '../../modules/asignatura/asignatura.service';

describe('AsignaturaController', () => {
  let controller: AsignaturaController;
  let module: TestingModule

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [AsignaturaController],
      providers: [{provide: AsignaturaService, useValue: {}}]
    }).compile();

    controller = module.get<AsignaturaController>(AsignaturaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  test('Primera prueba, debería funcionar mínimo u_u', async () =>{
    expect(await controller.getAsignatura(1)).not.toBeNull();
  });

  // Puedo hacer test de flujos??

  test('Primera prueba, debería funcionar mínimo u_u', async () =>{
    expect(await controller.getEstadoAsignatura(2,1)).not.toBeNull();
  });

  afterEach(async () => {
    await module.close();
  });
});

/**
 * Get Oferta
 * Postear Oferta 🔴
 * Publicar Oferta
 * Put Oferta
 *
 * Post plazo matricula
 * get plazo matricula
 * (matricula?)
 *
 * Inscribir Estudiante 🔴
 * Desinscribir xd
 *
 * Volver a Inscribir 🟡
 *
 * Post Asignatura
 * get Asignatura ID
 * Put Asignatura
 * Delete Asignatura
 *
 * Asignatura estado 🟡
 *
 * Buscar Asignatura
 * Añadir prerre
 * Get prerre
 * get tributa
 * delete prerre
 * 
 * put asig-carrera
 * delete asig-carrera
 * get asig x carrera
 * 
 * (carrera) - no probar lo q tiene en comun con asig?
 *
 *
 * Post periodo
 * get periodo id (puedo ver si me llega uno específico?)
 * put
 * delete
 * patch
 *
 * Lo mismo pal profe
 *
 *(carrera) - es independiente de todo asi q bue
 * Lo q si, no probar lo de los prerres
 */

/**
 * Oferta debería tener patch estado
 * Oferta debería tener softdelete
 */
