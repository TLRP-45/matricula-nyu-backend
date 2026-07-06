import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1783316772323 implements MigrationInterface {
    name = 'Init1783316772323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bloque_horario_entity\` ADD \`dia\` varchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` ADD \`semestre\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`bloque_horario_entity\` DROP COLUMN \`hora\``);
        await queryRunner.query(`ALTER TABLE \`bloque_horario_entity\` ADD \`hora\` varchar(5) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuario_entity\` CHANGE \`rol\` \`rol\` enum ('0', '1') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuario_entity\` CHANGE \`rol\` \`rol\` enum ('estudiante', 'admin') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`bloque_horario_entity\` DROP COLUMN \`hora\``);
        await queryRunner.query(`ALTER TABLE \`bloque_horario_entity\` ADD \`hora\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`oferta_entity\` DROP COLUMN \`semestre\``);
        await queryRunner.query(`ALTER TABLE \`bloque_horario_entity\` DROP COLUMN \`dia\``);
    }

}
