import { RolUsuario } from "../../modules/usuario/rol-usuario.enum";

export const administradorFixture = {
    ID_estudiante: 1,

    nombre: "Pedro",
    apellido: "Admin",

    email: "pedro@gmail.com",

    activo: true,

    createdAt: new Date("2026-01-10T08:00:00"),
    updatedAt: new Date("2026-01-10T08:00:00"),

    toma: [],
    matriculas: [],

    rut: "11111111-1",
    nacionalidad: "Chilena",
    sexo: "M",

    nacimiento: new Date("1995-01-01"),

    direccion: "Arica",
    telefono: "999999991",

    password: "123456",

    rol: RolUsuario.Admin,
};

export const estudianteFixture = {
    ID_estudiante: 2,

    nombre: "María",
    apellido: "González",

    email: "maria.gonzalez@universidad.cl",

    activo: true,

    createdAt: new Date("2026-01-10T08:00:00"),
    updatedAt: new Date("2026-01-10T08:00:00"),

    toma: [],
    matriculas: [],

    rut: "22222222-2",
    nacionalidad: "Chilena",
    sexo: "F",

    nacimiento: new Date("2004-03-15"),

    direccion: "Iquique",
    telefono: "999999992",

    password: "123456",

    rol: RolUsuario.Estudiante,
};
