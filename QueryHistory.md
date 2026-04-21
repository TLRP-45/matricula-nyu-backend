query: SELECT version()
query: SELECT * FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA` = 'sis_matricula' AND `TABLE_NAME` = 'migrations'
query: SELECT * FROM `sis_matricula`.`migrations` `migrations` ORDER BY `id` DESC
0 migrations are already loaded in the database.
1 migrations were found in the source code.
1 migrations are new migrations must be executed.
query: START TRANSACTION
query: CREATE TABLE `profesor_entity` (`ID_profesor` int NOT NULL AUTO_INCREMENT, `nombre` varchar(100) NOT NULL, `apellido` varchar(100) NOT NULL, `email` varchar(255) NOT NULL, UNIQUE INDEX `IDX_eceae0b935087ba3c3837b37b2` (`email`), PRIMARY KEY (`ID_profesor`)) ENGINE=InnoDB
query: CREATE TABLE `oferta_entity` (`id_imparte` int NOT NULL AUTO_INCREMENT, `tipo` varchar(100) NOT NULL, `grupo` varchar(100) NOT NULL, `cupos` int NOT NULL, PRIMARY KEY (`id_imparte`)) ENGINE=InnoDB
query: CREATE TABLE `estudiante_entity` (`ID_estudiante` int NOT NULL AUTO_INCREMENT, `nombre` varchar(100) NOT NULL, `apellido` varchar(100) NOT NULL, `email` varchar(255) NOT NULL, `activo` tinyint NOT NULL DEFAULT 1, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_53b960d730480020b34082fbe5` (`email`), PRIMARY KEY (`ID_estudiante`)) ENGINE=InnoDB
query: CREATE TABLE `carrera_entity` (`id_carrera` int NOT NULL AUTO_INCREMENT, `nombre` varchar(100) NOT NULL, `facultad` varchar(100) NOT NULL, PRIMARY KEY (`id_carrera`)) ENGINE=InnoDB
query: CREATE TABLE `asignatura_entity` (`id_asignatura` int NOT NULL AUTO_INCREMENT, `nombre` varchar(100) NOT NULL, `creditos` int NOT NULL, PRIMARY KEY (`id_asignatura`)) ENGINE=InnoDB
query: INSERT INTO `sis_matricula`.`migrations`(`timestamp`, `name`) VALUES (?, ?) -- PARAMETERS: [1776744494627,"EntidadesBase1776744494627"]
Migration EntidadesBase1776744494627 has been executed successfully.
query: COMMIT

---

query: SELECT version()
query: SELECT * FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA` = 'sis_matricula' AND `TABLE_NAME` = 'migrations'
query: SELECT * FROM `sis_matricula`.`migrations` `migrations` ORDER BY `id` DESC
1 migrations are already loaded in the database.
2 migrations were found in the source code.
EntidadesBase1776744494627 is the last executed migration. It was executed on Tue Apr 21 2026 00:08:14 GMT-0400 (hora estándar de Chile).
1 migrations are new migrations must be executed.
query: START TRANSACTION
query: ALTER TABLE `asignatura_entity` CHANGE `id_asignatura` `ID_asignatura` int NOT NULL AUTO_INCREMENT
query: CREATE TABLE `inscrito` (`ID_toma` int NOT NULL AUTO_INCREMENT, `semestre` int NOT NULL, `carreraIdCarrera` int NOT NULL, `asignaturaIDAsignatura` int NOT NULL, PRIMARY KEY (`ID_toma`)) ENGINE=InnoDB
query: CREATE TABLE `asignatura_entity_prerrequisitos_asignatura_entity` (`asignaturaEntityIDAsignatura_1` int NOT NULL, `asignaturaEntityIDAsignatura_2` int NOT NULL, INDEX `IDX_27ef96e8d67a21198cf29725d1` (`asignaturaEntityIDAsignatura_1`), INDEX `IDX_774bf61966e2d08395b76f8b55` (`asignaturaEntityIDAsignatura_2`), PRIMARY KEY (`asignaturaEntityIDAsignatura_1`, `asignaturaEntityIDAsignatura_2`)) ENGINE=InnoDB
query: ALTER TABLE `inscrito` DROP COLUMN `semestre`
query: ALTER TABLE `inscrito` DROP COLUMN `carreraIdCarrera`
query: ALTER TABLE `inscrito` DROP COLUMN `asignaturaIDAsignatura`
query: ALTER TABLE `oferta_entity` CHANGE `id_imparte` `id_imparte` int NOT NULL
query: ALTER TABLE `oferta_entity` DROP PRIMARY KEY
query: ALTER TABLE `oferta_entity` DROP COLUMN `id_imparte`
query: ALTER TABLE `inscrito` ADD `semestre` int NOT NULL
query: ALTER TABLE `inscrito` ADD `carreraIdCarrera` int NOT NULL
query: ALTER TABLE `inscrito` ADD `asignaturaIDAsignatura` int NOT NULL
query: ALTER TABLE `inscrito` ADD `estado` varchar(100) NOT NULL
query: ALTER TABLE `inscrito` ADD `estudianteIDEstudiante` int NOT NULL
query: ALTER TABLE `inscrito` ADD `ofertaIDOferta` int NOT NULL
query: ALTER TABLE `oferta_entity` ADD `ID_oferta` int NOT NULL PRIMARY KEY AUTO_INCREMENT
query: ALTER TABLE `oferta_entity` ADD `ID_profesor` int NOT NULL
query: ALTER TABLE `oferta_entity` ADD `ID_asignatura` int NOT NULL
query: ALTER TABLE `estudiante_entity` CHANGE `activo` `activo` tinyint NOT NULL DEFAULT 0
query: ALTER TABLE `inscrito` ADD CONSTRAINT `FK_f8441c4355aa6ce833dc2e79751` FOREIGN KEY (`carreraIdCarrera`) REFERENCES `carrera_entity`(`id_carrera`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `inscrito` ADD CONSTRAINT `FK_f6b9751eb4d2323ed2a7492b3f4` FOREIGN KEY (`asignaturaIDAsignatura`) REFERENCES `asignatura_entity`(`ID_asignatura`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `inscrito` ADD CONSTRAINT `FK_ee0285e6c8f19254e7290c49098` FOREIGN KEY (`estudianteIDEstudiante`) REFERENCES `estudiante_entity`(`ID_estudiante`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `inscrito` ADD CONSTRAINT `FK_dd37d849eed4a332716d2a4bb66` FOREIGN KEY (`ofertaIDOferta`) REFERENCES `oferta_entity`(`ID_oferta`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `oferta_entity` ADD CONSTRAINT `FK_cd97564ad62959dc7468b54b5bc` FOREIGN KEY (`ID_profesor`) REFERENCES `profesor_entity`(`ID_profesor`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `oferta_entity` ADD CONSTRAINT `FK_801479a1b819827376a4862575a` FOREIGN KEY (`ID_asignatura`) REFERENCES `asignatura_entity`(`ID_asignatura`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `asignatura_entity_prerrequisitos_asignatura_entity` ADD CONSTRAINT `FK_27ef96e8d67a21198cf29725d1c` FOREIGN KEY (`asignaturaEntityIDAsignatura_1`) REFERENCES `asignatura_entity`(`ID_asignatura`) ON DELETE CASCADE ON UPDATE CASCADE
query: ALTER TABLE `asignatura_entity_prerrequisitos_asignatura_entity` ADD CONSTRAINT `FK_774bf61966e2d08395b76f8b557` FOREIGN KEY (`asignaturaEntityIDAsignatura_2`) REFERENCES `asignatura_entity`(`ID_asignatura`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: INSERT INTO `sis_matricula`.`migrations`(`timestamp`, `name`) VALUES (?, ?) -- PARAMETERS: [1776801749637,"Relaciones1776801749637"]
Migration Relaciones1776801749637 has been executed successfully.
query: COMMIT

---

query: SELECT version()
query: SELECT * FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA` = 'sis_matricula' AND `TABLE_NAME` = 'migrations'
query: SELECT * FROM `sis_matricula`.`migrations` `migrations` ORDER BY `id` DESC
2 migrations are already loaded in the database.
2 migrations were found in the source code.
Relaciones1776801749637 is the last executed migration. It was executed on Tue Apr 21 2026 16:02:29 GMT-0400 (hora estándar de Chile).
1 migrations are new migrations must be executed.
query: START TRANSACTION
query: CREATE TABLE `Carreras` (`id_carrera` int NOT NULL AUTO_INCREMENT, `nombre` varchar(100) NOT NULL, `facultad` varchar(100) NOT NULL, PRIMARY KEY (`id_carrera`)) ENGINE=InnoDB
query: CREATE TABLE `RamosPorCarrera` (`ID_toma` int NOT NULL AUTO_INCREMENT, `semestre` int NOT NULL, `carreraIdCarrera` int NOT NULL, `asignaturaIDAsignatura` int NOT NULL, PRIMARY KEY (`ID_toma`)) ENGINE=InnoDB
query: CREATE TABLE `Asignaturas` (`ID_asignatura` int NOT NULL AUTO_INCREMENT, `nombre` varchar(100) NOT NULL, `creditos` int NOT NULL, PRIMARY KEY (`ID_asignatura`)) ENGINE=InnoDB
query: CREATE TABLE `Estudiantes` (`ID_estudiante` int NOT NULL AUTO_INCREMENT, `nombre` varchar(100) NOT NULL, `apellido` varchar(100) NOT NULL, `email` varchar(255) NOT NULL, `activo` tinyint NOT NULL DEFAULT 0, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
 ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_8e6b68dbf577ab702e9032ade0` (`email`), PRIMARY KEY (`ID_estudiante`)) ENGINE=InnoDB
query: CREATE TABLE `TomaDeRamos` (`ID_toma` int NOT NULL AUTO_INCREMENT, `estado` varchar(100) NOT NULL, `estudianteIDEstudiante` int NOT NULL, `ofertaIDOferta` int NOT NULL, PRIMARY KEY (`ID_toma`)) ENGINE=InnoDB
query: CREATE TABLE `OfertasAcademicas` (`ID_oferta` int NOT NULL AUTO_INCREMENT, `tipo` varchar(100) NOT NULL, `grupo` varchar(100) NOT NULL, `cupos` int NOT NULL, `ID_profesor` int NOT NULL, `ID_asignatura` int NOT NULL, PRIMARY KEY (`ID_oferta`)) ENGINE=InnoDB
query: CREATE TABLE `Profesores` (`ID_profesor` int NOT NULL AUTO_INCREMENT, `nombre` varchar(100) NOT NULL, `apellido` varchar(100) NOT NULL, `email` varchar(255) NOT NULL, UNIQUE INDEX `IDX_1b57908399775712f96f6610e3` (`email`), PRIMARY KEY (`ID_profesor`)) ENGINE=InnoDB
query: CREATE TABLE `asignaturas_prerrequisitos_asignaturas` (`asignaturasIDAsignatura_1` int NOT NULL, `asignaturasIDAsignatura_2` int NOT NULL, INDEX `IDX_e82be14788447b7414154871b7` (`asignaturasIDAsignatura_1`), INDEX `IDX_c50490e18a247ecbe1f11abf1f` (`asignaturasIDAsignatura_2`), PRIMARY KEY (`asignaturasIDAsignatura_1`, `asignaturasIDAsignatura_2`)) ENGINE=InnoDB
query: ALTER TABLE `RamosPorCarrera` ADD CONSTRAINT `FK_b568d205aa76403d0382431d209` FOREIGN KEY (`carreraIdCarrera`) REFERENCES `Carreras`(`id_carrera`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `RamosPorCarrera` ADD CONSTRAINT `FK_94751e7fcbf61daddacb712cffc` FOREIGN KEY (`asignaturaIDAsignatura`) REFERENCES `Asignaturas`(`ID_asignatura`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `TomaDeRamos` ADD CONSTRAINT `FK_79e5801aac41827010d7942f258` FOREIGN KEY (`estudianteIDEstudiante`) REFERENCES `Estudiantes`(`ID_estudiante`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `TomaDeRamos` ADD CONSTRAINT `FK_0335ad350e4071751a6b87359cd` FOREIGN KEY (`ofertaIDOferta`) REFERENCES `OfertasAcademicas`(`ID_oferta`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `OfertasAcademicas` ADD CONSTRAINT `FK_6c9742163f6704ae1615e7d889a` FOREIGN KEY (`ID_profesor`) REFERENCES `Profesores`(`ID_profesor`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `OfertasAcademicas` ADD CONSTRAINT `FK_908a33d6d1e6a9236966c975102` FOREIGN KEY (`ID_asignatura`) REFERENCES `Asignaturas`(`ID_asignatura`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `asignaturas_prerrequisitos_asignaturas` ADD CONSTRAINT `FK_e82be14788447b7414154871b70` FOREIGN KEY (`asignaturasIDAsignatura_1`) REFERENCES `Asignaturas`(`ID_asignatura`) ON DELETE CASCADE ON UPDATE CASCADE
query: ALTER TABLE `asignaturas_prerrequisitos_asignaturas` ADD CONSTRAINT `FK_c50490e18a247ecbe1f11abf1fe` FOREIGN KEY (`asignaturasIDAsignatura_2`) REFERENCES `Asignaturas`(`ID_asignatura`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: INSERT INTO `sis_matricula`.`migrations`(`timestamp`, `name`) VALUES (?, ?) -- PARAMETERS: [1776802296217,"Relaciones1776802296217"]
Migration Relaciones1776802296217 has been executed successfully.
query: COMMIT