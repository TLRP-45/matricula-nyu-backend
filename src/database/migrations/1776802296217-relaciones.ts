import { MigrationInterface, QueryRunner } from "typeorm";

export class Relaciones1776802296217 implements MigrationInterface {
    name = 'Relaciones1776802296217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Carreras\` (\`id_carrera\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(100) NOT NULL, \`facultad\` varchar(100) NOT NULL, PRIMARY KEY (\`id_carrera\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`RamosPorCarrera\` (\`ID_toma\` int NOT NULL AUTO_INCREMENT, \`semestre\` int NOT NULL, \`carreraIdCarrera\` int NOT NULL, \`asignaturaIDAsignatura\` int NOT NULL, PRIMARY KEY (\`ID_toma\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Asignaturas\` (\`ID_asignatura\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(100) NOT NULL, \`creditos\` int NOT NULL, PRIMARY KEY (\`ID_asignatura\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Estudiantes\` (\`ID_estudiante\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(100) NOT NULL, \`apellido\` varchar(100) NOT NULL, \`email\` varchar(255) NOT NULL, \`activo\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_8e6b68dbf577ab702e9032ade0\` (\`email\`), PRIMARY KEY (\`ID_estudiante\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`TomaDeRamos\` (\`ID_toma\` int NOT NULL AUTO_INCREMENT, \`estado\` varchar(100) NOT NULL, \`estudianteIDEstudiante\` int NOT NULL, \`ofertaIDOferta\` int NOT NULL, PRIMARY KEY (\`ID_toma\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`OfertasAcademicas\` (\`ID_oferta\` int NOT NULL AUTO_INCREMENT, \`tipo\` varchar(100) NOT NULL, \`grupo\` varchar(100) NOT NULL, \`cupos\` int NOT NULL, \`ID_profesor\` int NOT NULL, \`ID_asignatura\` int NOT NULL, PRIMARY KEY (\`ID_oferta\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Profesores\` (\`ID_profesor\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(100) NOT NULL, \`apellido\` varchar(100) NOT NULL, \`email\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_1b57908399775712f96f6610e3\` (\`email\`), PRIMARY KEY (\`ID_profesor\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`asignaturas_prerrequisitos_asignaturas\` (\`asignaturasIDAsignatura_1\` int NOT NULL, \`asignaturasIDAsignatura_2\` int NOT NULL, INDEX \`IDX_e82be14788447b7414154871b7\` (\`asignaturasIDAsignatura_1\`), INDEX \`IDX_c50490e18a247ecbe1f11abf1f\` (\`asignaturasIDAsignatura_2\`), PRIMARY KEY (\`asignaturasIDAsignatura_1\`, \`asignaturasIDAsignatura_2\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`RamosPorCarrera\` ADD CONSTRAINT \`FK_b568d205aa76403d0382431d209\` FOREIGN KEY (\`carreraIdCarrera\`) REFERENCES \`Carreras\`(\`id_carrera\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`RamosPorCarrera\` ADD CONSTRAINT \`FK_94751e7fcbf61daddacb712cffc\` FOREIGN KEY (\`asignaturaIDAsignatura\`) REFERENCES \`Asignaturas\`(\`ID_asignatura\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`TomaDeRamos\` ADD CONSTRAINT \`FK_79e5801aac41827010d7942f258\` FOREIGN KEY (\`estudianteIDEstudiante\`) REFERENCES \`Estudiantes\`(\`ID_estudiante\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`TomaDeRamos\` ADD CONSTRAINT \`FK_0335ad350e4071751a6b87359cd\` FOREIGN KEY (\`ofertaIDOferta\`) REFERENCES \`OfertasAcademicas\`(\`ID_oferta\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`OfertasAcademicas\` ADD CONSTRAINT \`FK_6c9742163f6704ae1615e7d889a\` FOREIGN KEY (\`ID_profesor\`) REFERENCES \`Profesores\`(\`ID_profesor\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`OfertasAcademicas\` ADD CONSTRAINT \`FK_908a33d6d1e6a9236966c975102\` FOREIGN KEY (\`ID_asignatura\`) REFERENCES \`Asignaturas\`(\`ID_asignatura\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`asignaturas_prerrequisitos_asignaturas\` ADD CONSTRAINT \`FK_e82be14788447b7414154871b70\` FOREIGN KEY (\`asignaturasIDAsignatura_1\`) REFERENCES \`Asignaturas\`(\`ID_asignatura\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`asignaturas_prerrequisitos_asignaturas\` ADD CONSTRAINT \`FK_c50490e18a247ecbe1f11abf1fe\` FOREIGN KEY (\`asignaturasIDAsignatura_2\`) REFERENCES \`Asignaturas\`(\`ID_asignatura\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`asignaturas_prerrequisitos_asignaturas\` DROP FOREIGN KEY \`FK_c50490e18a247ecbe1f11abf1fe\``);
        await queryRunner.query(`ALTER TABLE \`asignaturas_prerrequisitos_asignaturas\` DROP FOREIGN KEY \`FK_e82be14788447b7414154871b70\``);
        await queryRunner.query(`ALTER TABLE \`OfertasAcademicas\` DROP FOREIGN KEY \`FK_908a33d6d1e6a9236966c975102\``);
        await queryRunner.query(`ALTER TABLE \`OfertasAcademicas\` DROP FOREIGN KEY \`FK_6c9742163f6704ae1615e7d889a\``);
        await queryRunner.query(`ALTER TABLE \`TomaDeRamos\` DROP FOREIGN KEY \`FK_0335ad350e4071751a6b87359cd\``);
        await queryRunner.query(`ALTER TABLE \`TomaDeRamos\` DROP FOREIGN KEY \`FK_79e5801aac41827010d7942f258\``);
        await queryRunner.query(`ALTER TABLE \`RamosPorCarrera\` DROP FOREIGN KEY \`FK_94751e7fcbf61daddacb712cffc\``);
        await queryRunner.query(`ALTER TABLE \`RamosPorCarrera\` DROP FOREIGN KEY \`FK_b568d205aa76403d0382431d209\``);
        await queryRunner.query(`DROP INDEX \`IDX_c50490e18a247ecbe1f11abf1f\` ON \`asignaturas_prerrequisitos_asignaturas\``);
        await queryRunner.query(`DROP INDEX \`IDX_e82be14788447b7414154871b7\` ON \`asignaturas_prerrequisitos_asignaturas\``);
        await queryRunner.query(`DROP TABLE \`asignaturas_prerrequisitos_asignaturas\``);
        await queryRunner.query(`DROP INDEX \`IDX_1b57908399775712f96f6610e3\` ON \`Profesores\``);
        await queryRunner.query(`DROP TABLE \`Profesores\``);
        await queryRunner.query(`DROP TABLE \`OfertasAcademicas\``);
        await queryRunner.query(`DROP TABLE \`TomaDeRamos\``);
        await queryRunner.query(`DROP INDEX \`IDX_8e6b68dbf577ab702e9032ade0\` ON \`Estudiantes\``);
        await queryRunner.query(`DROP TABLE \`Estudiantes\``);
        await queryRunner.query(`DROP TABLE \`Asignaturas\``);
        await queryRunner.query(`DROP TABLE \`RamosPorCarrera\``);
        await queryRunner.query(`DROP TABLE \`Carreras\``);
    }

}
