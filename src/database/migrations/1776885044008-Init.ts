import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1776885044008 implements MigrationInterface {
    name = 'Init1776885044008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`carrera_entity\` (\`id_carrera\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`nombre\` varchar(100) NOT NULL, \`facultad\` varchar(100) NOT NULL, UNIQUE INDEX \`IDX_e045f36f7ac3dd1d69bb780372\` (\`nombre\`), PRIMARY KEY (\`id_carrera\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`carrera_tiene_asignatura_entity\` (\`ID_toma\` int NOT NULL AUTO_INCREMENT, \`semestre\` int NOT NULL, \`posicion\` int NOT NULL, \`carreraIdCarrera\` int UNSIGNED NOT NULL, \`asignaturaIDAsignatura\` int UNSIGNED NOT NULL, PRIMARY KEY (\`ID_toma\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`asignatura_entity\` (\`ID_asignatura\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`nombre\` varchar(100) NOT NULL, \`creditos\` tinyint UNSIGNED NOT NULL, \`caracter\` varchar(100) NOT NULL, \`hrs_presenciales\` smallint UNSIGNED NOT NULL, \`hrs_autonomo\` smallint UNSIGNED NOT NULL, PRIMARY KEY (\`ID_asignatura\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`estudiante_entity\` (\`ID_estudiante\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`nombre\` varchar(100) NOT NULL, \`apellido\` varchar(100) NOT NULL, \`email\` varchar(150) NOT NULL, \`activo\` tinyint NOT NULL DEFAULT 1, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`rut\` varchar(12) NOT NULL, \`nacionalidad\` varchar(100) NOT NULL, \`sexo\` enum ('M', 'F', 'O') NOT NULL, \`nacimiento\` date NOT NULL, \`direccion\` varchar(150) NOT NULL, \`telefono\` varchar(20) NOT NULL, UNIQUE INDEX \`IDX_53b960d730480020b34082fbe5\` (\`email\`), UNIQUE INDEX \`IDX_20eca523621709985109f744c0\` (\`rut\`), PRIMARY KEY (\`ID_estudiante\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`estudiante_toma_oferta_entity\` (\`ID_toma\` int NOT NULL AUTO_INCREMENT, \`estado\` varchar(100) NOT NULL, \`inscrita\` date NOT NULL, \`estudianteIDEstudiante\` int UNSIGNED NOT NULL, \`ofertaIDOferta\` int UNSIGNED NOT NULL, PRIMARY KEY (\`ID_toma\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bloque_horario_entity\` (\`ID_horario\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`ID_oferta\` int UNSIGNED NOT NULL, \`lugar\` varchar(100) NOT NULL, \`hora\` datetime NOT NULL, INDEX \`IDX_fe5739f1f2a9da7af2bda3c09e\` (\`ID_oferta\`), PRIMARY KEY (\`ID_horario\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`oferta_entity\` (\`ID_oferta\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`tipo\` enum ('C', 'T', 'L') NOT NULL, \`grupo\` varchar(20) NOT NULL, \`cupos\` smallint UNSIGNED NOT NULL, \`hrs_semanales\` smallint UNSIGNED NOT NULL, \`ID_profesor\` int UNSIGNED NOT NULL, \`ID_asignatura\` int UNSIGNED NOT NULL, INDEX \`IDX_cd97564ad62959dc7468b54b5b\` (\`ID_profesor\`), INDEX \`IDX_801479a1b819827376a4862575\` (\`ID_asignatura\`), PRIMARY KEY (\`ID_oferta\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`profesor_entity\` (\`ID_profesor\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`nombre\` varchar(100) NOT NULL, \`apellido\` varchar(100) NOT NULL, \`email\` varchar(150) NOT NULL, UNIQUE INDEX \`IDX_eceae0b935087ba3c3837b37b2\` (\`email\`), PRIMARY KEY (\`ID_profesor\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`asignatura_entity_prerrequisitos_asignatura_entity\` (\`asignaturaEntityIDAsignatura_1\` int UNSIGNED NOT NULL, \`asignaturaEntityIDAsignatura_2\` int UNSIGNED NOT NULL, INDEX \`IDX_27ef96e8d67a21198cf29725d1\` (\`asignaturaEntityIDAsignatura_1\`), INDEX \`IDX_774bf61966e2d08395b76f8b55\` (\`asignaturaEntityIDAsignatura_2\`), PRIMARY KEY (\`asignaturaEntityIDAsignatura_1\`, \`asignaturaEntityIDAsignatura_2\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`carrera_tiene_asignatura_entity\` ADD CONSTRAINT \`FK_2b21accf8bb9bbc932a4f3d2284\` FOREIGN KEY (\`carreraIdCarrera\`) REFERENCES \`carrera_entity\`(\`id_carrera\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`carrera_tiene_asignatura_entity\` ADD CONSTRAINT \`FK_d83fbe26b999665f9cd5bafca20\` FOREIGN KEY (\`asignaturaIDAsignatura\`) REFERENCES \`asignatura_entity\`(\`ID_asignatura\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`estudiante_toma_oferta_entity\` ADD CONSTRAINT \`FK_e210eb2068f8aa08968a1b83c94\` FOREIGN KEY (\`estudianteIDEstudiante\`) REFERENCES \`estudiante_entity\`(\`ID_estudiante\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`estudiante_toma_oferta_entity\` ADD CONSTRAINT \`FK_ea24298eaa835defd37496ac82b\` FOREIGN KEY (\`ofertaIDOferta\`) REFERENCES \`oferta_entity\`(\`ID_oferta\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bloque_horario_entity\` ADD CONSTRAINT \`FK_fe5739f1f2a9da7af2bda3c09e3\` FOREIGN KEY (\`ID_oferta\`) REFERENCES \`oferta_entity\`(\`ID_oferta\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` ADD CONSTRAINT \`FK_cd97564ad62959dc7468b54b5bc\` FOREIGN KEY (\`ID_profesor\`) REFERENCES \`profesor_entity\`(\`ID_profesor\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` ADD CONSTRAINT \`FK_801479a1b819827376a4862575a\` FOREIGN KEY (\`ID_asignatura\`) REFERENCES \`asignatura_entity\`(\`ID_asignatura\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`asignatura_entity_prerrequisitos_asignatura_entity\` ADD CONSTRAINT \`FK_27ef96e8d67a21198cf29725d1c\` FOREIGN KEY (\`asignaturaEntityIDAsignatura_1\`) REFERENCES \`asignatura_entity\`(\`ID_asignatura\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`asignatura_entity_prerrequisitos_asignatura_entity\` ADD CONSTRAINT \`FK_774bf61966e2d08395b76f8b557\` FOREIGN KEY (\`asignaturaEntityIDAsignatura_2\`) REFERENCES \`asignatura_entity\`(\`ID_asignatura\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`asignatura_entity_prerrequisitos_asignatura_entity\` DROP FOREIGN KEY \`FK_774bf61966e2d08395b76f8b557\``);
        await queryRunner.query(`ALTER TABLE \`asignatura_entity_prerrequisitos_asignatura_entity\` DROP FOREIGN KEY \`FK_27ef96e8d67a21198cf29725d1c\``);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` DROP FOREIGN KEY \`FK_801479a1b819827376a4862575a\``);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` DROP FOREIGN KEY \`FK_cd97564ad62959dc7468b54b5bc\``);
        await queryRunner.query(`ALTER TABLE \`bloque_horario_entity\` DROP FOREIGN KEY \`FK_fe5739f1f2a9da7af2bda3c09e3\``);
        await queryRunner.query(`ALTER TABLE \`estudiante_toma_oferta_entity\` DROP FOREIGN KEY \`FK_ea24298eaa835defd37496ac82b\``);
        await queryRunner.query(`ALTER TABLE \`estudiante_toma_oferta_entity\` DROP FOREIGN KEY \`FK_e210eb2068f8aa08968a1b83c94\``);
        await queryRunner.query(`ALTER TABLE \`carrera_tiene_asignatura_entity\` DROP FOREIGN KEY \`FK_d83fbe26b999665f9cd5bafca20\``);
        await queryRunner.query(`ALTER TABLE \`carrera_tiene_asignatura_entity\` DROP FOREIGN KEY \`FK_2b21accf8bb9bbc932a4f3d2284\``);
        await queryRunner.query(`DROP INDEX \`IDX_774bf61966e2d08395b76f8b55\` ON \`asignatura_entity_prerrequisitos_asignatura_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_27ef96e8d67a21198cf29725d1\` ON \`asignatura_entity_prerrequisitos_asignatura_entity\``);
        await queryRunner.query(`DROP TABLE \`asignatura_entity_prerrequisitos_asignatura_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_eceae0b935087ba3c3837b37b2\` ON \`profesor_entity\``);
        await queryRunner.query(`DROP TABLE \`profesor_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_801479a1b819827376a4862575\` ON \`oferta_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_cd97564ad62959dc7468b54b5b\` ON \`oferta_entity\``);
        await queryRunner.query(`DROP TABLE \`oferta_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe5739f1f2a9da7af2bda3c09e\` ON \`bloque_horario_entity\``);
        await queryRunner.query(`DROP TABLE \`bloque_horario_entity\``);
        await queryRunner.query(`DROP TABLE \`estudiante_toma_oferta_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_20eca523621709985109f744c0\` ON \`estudiante_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_53b960d730480020b34082fbe5\` ON \`estudiante_entity\``);
        await queryRunner.query(`DROP TABLE \`estudiante_entity\``);
        await queryRunner.query(`DROP TABLE \`asignatura_entity\``);
        await queryRunner.query(`DROP TABLE \`carrera_tiene_asignatura_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_e045f36f7ac3dd1d69bb780372\` ON \`carrera_entity\``);
        await queryRunner.query(`DROP TABLE \`carrera_entity\``);
    }

}
