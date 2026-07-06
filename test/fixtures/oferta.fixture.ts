
/**
 * Fixtures del módulo
 * 
 * Simular registros existentes en la base de datos.
 * 
 * Cuando un caso de prueba requiera un escenario diferente, se recomienda
 * crear una copia mediante el operador spread (...) y sobrescribir únicamente
 * las propiedades necesarias.
 */


export const ofertaFixture = {
    ID_oferta: 10,
    tipo: 'C',
    grupo: 'A',
    cupos: 30,
    hrs_semanales: 4,
    estado: 'PUBLICADA',

    asignatura: {
        ID_asignatura: 1,
        nombre: 'Matemática I',
        creditos: 4,
        caracter: 'Obligatoria',
        hrs_presenciales: 4,
        hrs_autonomo: 2,
    },

    carrera: {
        id_carrera: 1,
        nombre: 'Ingeniería',
    },

    periodo_inscripcion: {
        ID_periodo: 1,
    },

    profesor: null,
};