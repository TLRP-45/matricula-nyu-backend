/**
 * Fixtures del módulo
 * 
 * Simular registros existentes en la base de datos.
 * 
 * Cuando un caso de prueba requiera un escenario diferente, se recomienda
 * crear una copia mediante el operador spread (...) y sobrescribir únicamente
 * las propiedades necesarias.
 */

export const plazoActivoFixture = {

    inicio: new Date("2026-01-01"),

    fin: new Date("2026-12-31"),

};

export const plazoVencidoFixture = {

    inicio: new Date("2025-01-01"),

    fin: new Date("2025-12-31"),

};