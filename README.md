# Sistema de Matrícula y Gestión Académica NYU

> [Frontend](https://github.com/TLRP-45/matricula-nyu-frontend)

Este repositorio contiene la parte backend del sistema de matrícula y gestión
académica para el ramo de Taller de Aplicaciones Web de la Universidad de
Tarapacá.

Utiliza:

- [Nest](https://github.com/nestjs/nest) v11.0.16
- [TypeORM](https://typeorm.io/)
- [MySQL](https://mysql.com)
- [XAMPP](https://www.apachefriends.org/index.html)

## Funcionalidades y Roadmap

El sistema espera implementar los flujos típicos de un estudiante con respecto
a su matrícula y la inscripción de asignaturas. La siguiente lista se irá
actualizando a medida que se avance en el proyecto:

- [x] Inicio de sesión
- [x] Inscripción de asignaturas
- [x] Inscripción de matrícula
- [x] Desinscripción de asignaturas
- [x] Registro de usuarios
- [x] Administración de carreras y planes de estudio
- [x] Administración de oferta académica
- [x] Acceso a malla curricular
- [x] Acceso a horario semanal
- [x] Prevención de choques horarios
- [x] Autenticación de solicitudes
- [x] Caching y optimizaciones de rendimiento

## Setup del proyecto

```bash
$ npm install
```

## Compilar y correr

```bash
# levantar
$ npm run start

# modo watch
$ npm run start:dev

# modo producción
$ npm run start:prod
```

## Tests

```bash
$ npm test
```
