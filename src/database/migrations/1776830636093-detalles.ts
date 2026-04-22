import { MigrationInterface, QueryRunner } from "typeorm";

export class Detalles1776830636093 implements MigrationInterface {
    name = 'Detalles1776830636093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Carreras\` (\`id_carrera\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`nombre\` varchar(100) NOT NULL, \`facultad\` varchar(100) NOT NULL, UNIQUE INDEX \`IDX_1138d2479273da65e0fcd1e321\` (\`nombre\`), PRIMARY KEY (\`id_carrera\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`RamosPorCarrera\` (\`ID_toma\` int NOT NULL AUTO_INCREMENT, \`semestre\` int NOT NULL, \`carreraIdCarrera\` int UNSIGNED NOT NULL, \`asignaturaIDAsignatura\` int UNSIGNED NOT NULL, PRIMARY KEY (\`ID_toma\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Asignaturas\` (\`ID_asignatura\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`nombre\` varchar(100) NOT NULL, \`creditos\` tinyint UNSIGNED NOT NULL, \`caracter\` varchar(100) NOT NULL, \`hrs_presenciales\` smallint UNSIGNED NOT NULL, \`hrs_autonomo\` smallint UNSIGNED NOT NULL, PRIMARY KEY (\`ID_asignatura\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Estudiantes\` (\`ID_estudiante\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`nombre\` varchar(100) NOT NULL, \`apellido\` varchar(100) NOT NULL, \`email\` varchar(150) NOT NULL, \`activo\` tinyint NOT NULL DEFAULT 1, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`rut\` varchar(12) NOT NULL, \`nacionalidad\` varchar(100) NOT NULL, \`sexo\` enum ('M', 'F', 'O') NOT NULL, \`nacimiento\` date NOT NULL, \`direccion\` varchar(150) NOT NULL, \`telefono\` varchar(20) NOT NULL, UNIQUE INDEX \`IDX_8e6b68dbf577ab702e9032ade0\` (\`email\`), UNIQUE INDEX \`IDX_bab39f0acb8c3071b132751898\` (\`rut\`), PRIMARY KEY (\`ID_estudiante\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`TomaDeRamos\` (\`ID_toma\` int NOT NULL AUTO_INCREMENT, \`estado\` varchar(100) NOT NULL, \`inscrita\` date NOT NULL, \`estudianteIDEstudiante\` int UNSIGNED NOT NULL, \`ofertaIDOferta\` int UNSIGNED NOT NULL, PRIMARY KEY (\`ID_toma\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Horario\` (\`ID_horario\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`ID_oferta\` int UNSIGNED NOT NULL, \`lugar\` varchar(100) NOT NULL, \`hora\` datetime NOT NULL, INDEX \`IDX_48057d68203908b7e08c3a26cb\` (\`ID_oferta\`), PRIMARY KEY (\`ID_horario\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`OfertasAcademicas\` (\`ID_oferta\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`tipo\` enum ('C', 'T', 'L') NOT NULL, \`grupo\` varchar(20) NOT NULL, \`cupos\` smallint UNSIGNED NOT NULL, \`hrs_semanales\` smallint UNSIGNED NOT NULL, \`ID_profesor\` int UNSIGNED NOT NULL, \`ID_asignatura\` int UNSIGNED NOT NULL, INDEX \`IDX_6c9742163f6704ae1615e7d889\` (\`ID_profesor\`), INDEX \`IDX_908a33d6d1e6a9236966c97510\` (\`ID_asignatura\`), PRIMARY KEY (\`ID_oferta\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Profesores\` (\`ID_profesor\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`nombre\` varchar(100) NOT NULL, \`apellido\` varchar(100) NOT NULL, \`email\` varchar(150) NOT NULL, UNIQUE INDEX \`IDX_1b57908399775712f96f6610e3\` (\`email\`), PRIMARY KEY (\`ID_profesor\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`asignaturas_prerrequisitos_asignaturas\` CHANGE \`asignaturasIDAsignatura_1\` \`asignaturasIDAsignatura_1\` int UNSIGNED NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`asignaturas_prerrequisitos_asignaturas\` CHANGE \`asignaturasIDAsignatura_2\` \`asignaturasIDAsignatura_2\` int UNSIGNED NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`RamosPorCarrera\` ADD CONSTRAINT \`FK_b568d205aa76403d0382431d209\` FOREIGN KEY (\`carreraIdCarrera\`) REFERENCES \`Carreras\`(\`id_carrera\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`RamosPorCarrera\` ADD CONSTRAINT \`FK_94751e7fcbf61daddacb712cffc\` FOREIGN KEY (\`asignaturaIDAsignatura\`) REFERENCES \`Asignaturas\`(\`ID_asignatura\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`TomaDeRamos\` ADD CONSTRAINT \`FK_79e5801aac41827010d7942f258\` FOREIGN KEY (\`estudianteIDEstudiante\`) REFERENCES \`Estudiantes\`(\`ID_estudiante\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`TomaDeRamos\` ADD CONSTRAINT \`FK_0335ad350e4071751a6b87359cd\` FOREIGN KEY (\`ofertaIDOferta\`) REFERENCES \`OfertasAcademicas\`(\`ID_oferta\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Horario\` ADD CONSTRAINT \`FK_48057d68203908b7e08c3a26cb9\` FOREIGN KEY (\`ID_oferta\`) REFERENCES \`OfertasAcademicas\`(\`ID_oferta\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`OfertasAcademicas\` ADD CONSTRAINT \`FK_6c9742163f6704ae1615e7d889a\` FOREIGN KEY (\`ID_profesor\`) REFERENCES \`Profesores\`(\`ID_profesor\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`OfertasAcademicas\` ADD CONSTRAINT \`FK_908a33d6d1e6a9236966c975102\` FOREIGN KEY (\`ID_asignatura\`) REFERENCES \`Asignaturas\`(\`ID_asignatura\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`asignaturas_prerrequisitos_asignaturas\` ADD CONSTRAINT \`FK_e82be14788447b7414154871b70\` FOREIGN KEY (\`asignaturasIDAsignatura_1\`) REFERENCES \`Asignaturas\`(\`ID_asignatura\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`asignaturas_prerrequisitos_asignaturas\` ADD CONSTRAINT \`FK_c50490e18a247ecbe1f11abf1fe\` FOREIGN KEY (\`asignaturasIDAsignatura_2\`) REFERENCES \`Asignaturas\`(\`ID_asignatura\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`asignaturas_prerrequisitos_asignaturas\` DROP FOREIGN KEY \`FK_c50490e18a247ecbe1f11abf1fe\``);
        await queryRunner.query(`ALTER TABLE \`asignaturas_prerrequisitos_asignaturas\` DROP FOREIGN KEY \`FK_e82be14788447b7414154871b70\``);
        await queryRunner.query(`ALTER TABLE \`OfertasAcademicas\` DROP FOREIGN KEY \`FK_908a33d6d1e6a9236966c975102\``);
        await queryRunner.query(`ALTER TABLE \`OfertasAcademicas\` DROP FOREIGN KEY \`FK_6c9742163f6704ae1615e7d889a\``);
        await queryRunner.query(`ALTER TABLE \`Horario\` DROP FOREIGN KEY \`FK_48057d68203908b7e08c3a26cb9\``);
        await queryRunner.query(`ALTER TABLE \`TomaDeRamos\` DROP FOREIGN KEY \`FK_0335ad350e4071751a6b87359cd\``);
        await queryRunner.query(`ALTER TABLE \`TomaDeRamos\` DROP FOREIGN KEY \`FK_79e5801aac41827010d7942f258\``);
        await queryRunner.query(`ALTER TABLE \`RamosPorCarrera\` DROP FOREIGN KEY \`FK_94751e7fcbf61daddacb712cffc\``);
        await queryRunner.query(`ALTER TABLE \`RamosPorCarrera\` DROP FOREIGN KEY \`FK_b568d205aa76403d0382431d209\``);
        await queryRunner.query(`ALTER TABLE \`asignaturas_prerrequisitos_asignaturas\` CHANGE \`asignaturasIDAsignatura_2\` \`asignaturasIDAsignatura_2\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`asignaturas_prerrequisitos_asignaturas\` CHANGE \`asignaturasIDAsignatura_1\` \`asignaturasIDAsignatura_1\` int NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_1b57908399775712f96f6610e3\` ON \`Profesores\``);
        await queryRunner.query(`DROP TABLE \`Profesores\``);
        await queryRunner.query(`DROP INDEX \`IDX_908a33d6d1e6a9236966c97510\` ON \`OfertasAcademicas\``);
        await queryRunner.query(`DROP INDEX \`IDX_6c9742163f6704ae1615e7d889\` ON \`OfertasAcademicas\``);
        await queryRunner.query(`DROP TABLE \`OfertasAcademicas\``);
        await queryRunner.query(`DROP INDEX \`IDX_48057d68203908b7e08c3a26cb\` ON \`Horario\``);
        await queryRunner.query(`DROP TABLE \`Horario\``);
        await queryRunner.query(`DROP TABLE \`TomaDeRamos\``);
        await queryRunner.query(`DROP INDEX \`IDX_bab39f0acb8c3071b132751898\` ON \`Estudiantes\``);
        await queryRunner.query(`DROP INDEX \`IDX_8e6b68dbf577ab702e9032ade0\` ON \`Estudiantes\``);
        await queryRunner.query(`DROP TABLE \`Estudiantes\``);
        await queryRunner.query(`DROP TABLE \`Asignaturas\``);
        await queryRunner.query(`DROP TABLE \`RamosPorCarrera\``);
        await queryRunner.query(`DROP INDEX \`IDX_1138d2479273da65e0fcd1e321\` ON \`Carreras\``);
        await queryRunner.query(`DROP TABLE \`Carreras\``);
    }

}
