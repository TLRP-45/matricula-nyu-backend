import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1783309633803 implements MigrationInterface {
    name = 'Init1783309633803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_cd97564ad62959dc7468b54b5bc\` ON \`oferta_entity\``);
        await queryRunner.query(`DROP INDEX \`FK_801479a1b819827376a4862575a\` ON \`oferta_entity\``);
        await queryRunner.query(`DROP INDEX \`FK_3eba046729cb4d1b542fb99f9b8\` ON \`oferta_entity\``);
        await queryRunner.query(`CREATE TABLE \`periodo_inscripcion\` (\`ID_periodo\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`inicio\` datetime NOT NULL, \`final\` datetime NOT NULL, \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`ID_periodo\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`profesor_entity\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`usuario_entity\` ADD \`ID_externo\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`matricula_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`matricula_entity\` DROP COLUMN \`estado\``);
        await queryRunner.query(`ALTER TABLE \`matricula_entity\` ADD \`estado\` enum ('ACTIVA', 'INACTIVA') NOT NULL DEFAULT 'ACTIVA'`);
        await queryRunner.query(`ALTER TABLE \`carrera_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`asignatura_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` DROP FOREIGN KEY \`FK_a8430eda9078ad51fd3ae151572\``);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` CHANGE \`grupo\` \`grupo\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` CHANGE \`ID_profesor\` \`ID_profesor\` int UNSIGNED NULL`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` CHANGE \`ID_asignatura\` \`ID_asignatura\` int UNSIGNED NULL`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` CHANGE \`ID_carrera\` \`ID_carrera\` int UNSIGNED NULL`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` CHANGE \`ID_periodo\` \`ID_periodo\` int UNSIGNED NULL`);
        await queryRunner.query(`ALTER TABLE \`estudiante_toma_oferta_entity\` DROP COLUMN \`estado\``);
        await queryRunner.query(`ALTER TABLE \`estudiante_toma_oferta_entity\` ADD \`estado\` enum ('INSCRITO', 'APROBADO', 'REPROBADO', 'CASUAL') NOT NULL DEFAULT 'INSCRITO'`);
        await queryRunner.query(`ALTER TABLE \`estudiante_toma_oferta_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` ADD CONSTRAINT \`FK_cd97564ad62959dc7468b54b5bc\` FOREIGN KEY (\`ID_profesor\`) REFERENCES \`profesor_entity\`(\`ID_profesor\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` ADD CONSTRAINT \`FK_801479a1b819827376a4862575a\` FOREIGN KEY (\`ID_asignatura\`) REFERENCES \`asignatura_entity\`(\`ID_asignatura\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` ADD CONSTRAINT \`FK_a8430eda9078ad51fd3ae151572\` FOREIGN KEY (\`ID_carrera\`) REFERENCES \`carrera_entity\`(\`id_carrera\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` ADD CONSTRAINT \`FK_3eba046729cb4d1b542fb99f9b8\` FOREIGN KEY (\`ID_periodo\`) REFERENCES \`periodo_inscripcion\`(\`ID_periodo\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` DROP FOREIGN KEY \`FK_3eba046729cb4d1b542fb99f9b8\``);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` DROP FOREIGN KEY \`FK_a8430eda9078ad51fd3ae151572\``);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` DROP FOREIGN KEY \`FK_801479a1b819827376a4862575a\``);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` DROP FOREIGN KEY \`FK_cd97564ad62959dc7468b54b5bc\``);
        await queryRunner.query(`ALTER TABLE \`estudiante_toma_oferta_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`estudiante_toma_oferta_entity\` DROP COLUMN \`estado\``);
        await queryRunner.query(`ALTER TABLE \`estudiante_toma_oferta_entity\` ADD \`estado\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` CHANGE \`ID_periodo\` \`ID_periodo\` int UNSIGNED NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` CHANGE \`ID_carrera\` \`ID_carrera\` int UNSIGNED NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` CHANGE \`ID_asignatura\` \`ID_asignatura\` int UNSIGNED NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` CHANGE \`ID_profesor\` \`ID_profesor\` int UNSIGNED NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` CHANGE \`grupo\` \`grupo\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` ADD CONSTRAINT \`FK_a8430eda9078ad51fd3ae151572\` FOREIGN KEY (\`ID_carrera\`) REFERENCES \`carrera_entity\`(\`id_carrera\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`asignatura_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`carrera_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`matricula_entity\` DROP COLUMN \`estado\``);
        await queryRunner.query(`ALTER TABLE \`matricula_entity\` ADD \`estado\` varchar(255) NOT NULL DEFAULT ''activa''`);
        await queryRunner.query(`ALTER TABLE \`matricula_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`usuario_entity\` DROP COLUMN \`ID_externo\``);
        await queryRunner.query(`ALTER TABLE \`profesor_entity\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`DROP TABLE \`periodo_inscripcion\``);
        await queryRunner.query(`CREATE INDEX \`FK_3eba046729cb4d1b542fb99f9b8\` ON \`oferta_entity\` (\`ID_periodo\`)`);
        await queryRunner.query(`CREATE INDEX \`FK_801479a1b819827376a4862575a\` ON \`oferta_entity\` (\`ID_asignatura\`)`);
        await queryRunner.query(`CREATE INDEX \`FK_cd97564ad62959dc7468b54b5bc\` ON \`oferta_entity\` (\`ID_profesor\`)`);
    }

}
