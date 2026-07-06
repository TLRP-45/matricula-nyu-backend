/**
 * Fixtures del módulo
 * 
 * Simular registros existentes en la base de datos.
 * 
 * Cuando un caso de prueba requiera un escenario diferente, se recomienda
 * crear una copia mediante el operador spread (...) y sobrescribir únicamente
 * las propiedades necesarias.
 */

export const carreraInformaticaFixture = {

    id_carrera: 1,

    nombre: "Ingeniería Civil Informática",

    facultad: "Ingeniería",

    tiene: [],

    matriculados: [],

    ofertas: [],

    duracion: 10,

    cupos: 120,

    deletedAt: undefined,

};

export const carreraIndustrialFixture = {

    id_carrera: 2,

    nombre: "Ingeniería Civil Industrial",

    facultad: "Ingeniería",

    tiene: [],

    matriculados: [],

    ofertas: [],

    duracion: 10,

    cupos: 100,

    deletedAt: undefined,

};