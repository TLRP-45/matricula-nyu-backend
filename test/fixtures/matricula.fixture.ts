import { EstadoOMatricula } from "../../src/modules/matricula/matricula-estado.enum";
import { estudianteFixture } from "./usuario.fixture";
import { carreraInformaticaFixture } from "./carrera.fixture"

export const matriculaActivaFixture = {

    ID_matricula: 1,

    deletedAt: undefined,

    createdAt: new Date("2026-01-10"),

    updatedAt: new Date("2026-01-10"),

    arancel_aldia: true,

    estudiante: estudianteFixture,

    carrera: carreraInformaticaFixture,

    semestre: 1,

    estado: EstadoOMatricula.ACTIVA,

};

export const matriculaInactivaFixture = {

    ...matriculaActivaFixture,

    ID_matricula: 2,

    estado: EstadoOMatricula.INACTIVA,

    arancel_aldia: false,

};