import { MigrationInterface, QueryRunner } from "typeorm";

export class PeriodoInscripcion1776907113852 implements MigrationInterface {
    name = 'PeriodoInscripcion1776907113852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`PeriodoInscripcion\` (\`ID_periodo\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`inicio\` datetime NOT NULL, \`final\` datetime NOT NULL, PRIMARY KEY (\`ID_periodo\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` ADD \`ID_periodo\` int UNSIGNED NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` ADD CONSTRAINT \`FK_3eba046729cb4d1b542fb99f9b8\` FOREIGN KEY (\`ID_periodo\`) REFERENCES \`PeriodoInscripcion\`(\`ID_periodo\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` DROP FOREIGN KEY \`FK_3eba046729cb4d1b542fb99f9b8\``);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` DROP COLUMN \`ID_periodo\``);
        await queryRunner.query(`DROP TABLE \`PeriodoInscripcion\``);
    }

}
