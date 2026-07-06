import { EstadoOMatricula } from "../../src/modules/matricula/matricula-estado.enum";

/**
 * Fixtures del módulo
 * 
 * Simular registros existentes en la base de datos.
 * 
 * Cuando un caso de prueba requiera un escenario diferente, se recomienda
 * crear una copia mediante el operador spread (...) y sobrescribir únicamente
 * las propiedades necesarias.
 */

export const matriculaDTOFixture = {
    ID_estudiante: 2,
    ID_carrera: 1,
    semestre: 1,
    estado: EstadoOMatricula.ACTIVA,
};