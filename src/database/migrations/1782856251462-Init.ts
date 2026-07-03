import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1782856251462 implements MigrationInterface {
    name = 'Init1782856251462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profesor_entity\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`matricula_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`carrera_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`asignatura_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`periodo_inscripcion\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` DROP FOREIGN KEY \`FK_cd97564ad62959dc7468b54b5bc\``);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` DROP FOREIGN KEY \`FK_801479a1b819827376a4862575a\``);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` DROP FOREIGN KEY \`FK_a8430eda9078ad51fd3ae151572\``);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` DROP FOREIGN KEY \`FK_3eba046729cb4d1b542fb99f9b8\``);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` CHANGE \`grupo\` \`grupo\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` CHANGE \`ID_profesor\` \`ID_profesor\` int UNSIGNED NULL`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` CHANGE \`ID_asignatura\` \`ID_asignatura\` int UNSIGNED NULL`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` CHANGE \`ID_carrera\` \`ID_carrera\` int UNSIGNED NULL`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` CHANGE \`ID_periodo\` \`ID_periodo\` int UNSIGNED NULL`);
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
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` CHANGE \`ID_periodo\` \`ID_periodo\` int UNSIGNED NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` CHANGE \`ID_carrera\` \`ID_carrera\` int UNSIGNED NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` CHANGE \`ID_asignatura\` \`ID_asignatura\` int UNSIGNED NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` CHANGE \`ID_profesor\` \`ID_profesor\` int UNSIGNED NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` CHANGE \`grupo\` \`grupo\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` ADD CONSTRAINT \`FK_3eba046729cb4d1b542fb99f9b8\` FOREIGN KEY (\`ID_periodo\`) REFERENCES \`periodo_inscripcion\`(\`ID_periodo\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` ADD CONSTRAINT \`FK_a8430eda9078ad51fd3ae151572\` FOREIGN KEY (\`ID_carrera\`) REFERENCES \`carrera_entity\`(\`id_carrera\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` ADD CONSTRAINT \`FK_801479a1b819827376a4862575a\` FOREIGN KEY (\`ID_asignatura\`) REFERENCES \`asignatura_entity\`(\`ID_asignatura\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` ADD CONSTRAINT \`FK_cd97564ad62959dc7468b54b5bc\` FOREIGN KEY (\`ID_profesor\`) REFERENCES \`profesor_entity\`(\`ID_profesor\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`periodo_inscripcion\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`asignatura_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`carrera_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`matricula_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`profesor_entity\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
    }

}
