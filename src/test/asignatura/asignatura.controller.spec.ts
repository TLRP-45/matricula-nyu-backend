import { Test, TestingModule } from '@nestjs/testing';
import { AsignaturaCarreraDto, AsignaturaController, AsignaturaPrerrequisitosDto } from '../../modules/asignatura/asignatura.controller';
import { AppModule } from '../../app.module';
import { CaracterAsignatura } from '../../modules/asignatura/asignatura-caracter.enum';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AsignaturaController', () => {
  let controller: AsignaturaController;
  let module: TestingModule
  let asignaturaID: number;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<AsignaturaController>(AsignaturaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('debería crear una asignatura', async () => {
    const dto = {
        nombre: 'JEST-TEST',
        creditos: 5,
        caracter: CaracterAsignatura.ELECTIVA,
        hrs_presenciales: 4,
        hrs_autonomo: 2,
    };
    const creada = await controller.createAsignatura(dto);
    asignaturaID = creada.ID_asignatura;
    expect(creada).toBeDefined();
    expect(creada.nombre).toBe(dto.nombre);
  });

  it('debería obtener la asignatura creada', async () => {
    const asignatura = await controller.getAsignatura(asignaturaID);
    expect(asignatura.ID_asignatura).toBe(asignaturaID);
  });

  it('debería actualizar la asignatura', async () => {
    await controller.putAsignatura(asignaturaID,{
        nombre:"INF101-JEST MODIFICADO"
    });
    const asignatura =
        await controller.getAsignatura(asignaturaID);
    expect(asignatura.nombre).toBe("INF101-JEST MODIFICADO");
  });

  it('debería buscar una asignatura por nombre', async () => {
    const resultado = await controller.buscarAsignaturas('JEST MODIFICADO');

    expect(resultado).toBeDefined();
    if (!resultado) {
      throw new Error('La búsqueda no devolvió resultados.');
    }
    expect(resultado.length).toBeGreaterThan(0);
    expect(resultado[0].nombre).toContain('JEST');
  });

  it('debería buscar una asignatura por código', async () => {
    const resultado = await controller.buscarAsignaturas(undefined, 'INF101');

    expect(resultado).toBeDefined();
    if (!resultado) {
      throw new Error('La búsqueda no devolvió resultados.');
    }
    expect(resultado[0].nombre).toContain('INF101');
  });

  it('debería lanzar BadRequest si no se envía nombre ni código', async () => {
    await expect(
      controller.buscarAsignaturas()
    ).rejects.toThrow(BadRequestException);
  });

  it('debería eliminar la asignatura', async () => {
    await controller.deleteAsignatura(asignaturaID);
    await expect(controller.getAsignatura(asignaturaID)).rejects.toThrow();
  });

  afterAll(async () => {
    await module.close();
  });
});

describe('Prerrequisitos', ()=>{
  let controller: AsignaturaController;
  let module: TestingModule

  let algebraID: number;
  let calculoID: number;
  let carreraID: number=1;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<AsignaturaController>(AsignaturaController);
  });

  it('debería agregar dos asignaturas', async ()=>{
    const algebra = await controller.createAsignatura({
      nombre: 'ÁLGEBRA JEST',
      creditos: 5,
      caracter: CaracterAsignatura.ELECTIVA,
      hrs_presenciales: 4,
      hrs_autonomo: 2,
    });
    const calculo = await controller.createAsignatura({
      nombre: 'CÁLCULO JEST',
      creditos: 5,
      caracter: CaracterAsignatura.ELECTIVA,
      hrs_presenciales: 4,
      hrs_autonomo: 2,
    });
    algebraID = algebra.ID_asignatura;
    calculoID = calculo.ID_asignatura;
    const dto: AsignaturaPrerrequisitosDto = {ID_prerrequisitos : [algebraID]};
    await controller.putPushPrerrequisitos(calculoID, dto);
  });

  it('debería agregar relación entre asignatura y carrera',async ()=>{
    const dto: AsignaturaCarreraDto = {posicion : 1, semestre : 1};
    const relacion = await controller.putPushAsignaturaCarrera(algebraID,carreraID, dto);
    await controller.putPushAsignaturaCarrera(calculoID,carreraID, dto);
    expect(relacion).toBeDefined();
    expect(relacion.posicion).toBe(1);
  });

  it('debería consultar prerrequisitos',async ()=>{
    const prerres = await controller.getPrerrerequisitosPorCarrera(carreraID,calculoID);
    expect(prerres).toBeDefined();
    expect(prerres.length).toBeGreaterThan(0);
  });

  it('debería consultar tributas',async ()=>{
    const tributas = await controller.getTributasPorCarrera(carreraID,algebraID);
    expect(tributas).toBeDefined();
    expect(tributas.length).toBeGreaterThan(0);
  });

  it('debería eliminar prerrequisito',async ()=>{
    const dto: AsignaturaPrerrequisitosDto = {ID_prerrequisitos : [algebraID]};
    await controller.putRemovePrerrequisitos(calculoID, dto);
    const prerres = await controller.getPrerrerequisitosPorCarrera(carreraID,calculoID);
    expect(
      prerres.some(x => x.ID_asignatura === algebraID)
    ).toBe(false);
  });

  it('debería eliminar relación entre asignatura y carrera',async ()=>{
    await controller.putRemoveAsignaturaCarrera(algebraID, carreraID);
    await expect(
        controller.getPrerrerequisitosPorCarrera(carreraID, algebraID)
      ).rejects.toThrow(NotFoundException);
  });

  afterAll(async () => {
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
