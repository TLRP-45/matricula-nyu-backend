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