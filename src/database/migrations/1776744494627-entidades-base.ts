import { MigrationInterface, QueryRunner } from "typeorm";

export class EntidadesBase1776744494627 implements MigrationInterface {
    name = 'EntidadesBase1776744494627'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`profesor_entity\` (\`ID_profesor\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(100) NOT NULL, \`apellido\` varchar(100) NOT NULL, \`email\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_eceae0b935087ba3c3837b37b2\` (\`email\`), PRIMARY KEY (\`ID_profesor\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`oferta_entity\` (\`id_imparte\` int NOT NULL AUTO_INCREMENT, \`tipo\` varchar(100) NOT NULL, \`grupo\` varchar(100) NOT NULL, \`cupos\` int NOT NULL, PRIMARY KEY (\`id_imparte\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`estudiante_entity\` (\`ID_estudiante\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(100) NOT NULL, \`apellido\` varchar(100) NOT NULL, \`email\` varchar(255) NOT NULL, \`activo\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_53b960d730480020b34082fbe5\` (\`email\`), PRIMARY KEY (\`ID_estudiante\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`carrera_entity\` (\`id_carrera\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(100) NOT NULL, \`facultad\` varchar(100) NOT NULL, PRIMARY KEY (\`id_carrera\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`asignatura_entity\` (\`id_asignatura\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(100) NOT NULL, \`creditos\` int NOT NULL, PRIMARY KEY (\`id_asignatura\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`asignatura_entity\``);
        await queryRunner.query(`DROP TABLE \`carrera_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_53b960d730480020b34082fbe5\` ON \`estudiante_entity\``);
        await queryRunner.query(`DROP TABLE \`estudiante_entity\``);
        await queryRunner.query(`DROP TABLE \`oferta_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_eceae0b935087ba3c3837b37b2\` ON \`profesor_entity\``);
        await queryRunner.query(`DROP TABLE \`profesor_entity\``);
    }

}
