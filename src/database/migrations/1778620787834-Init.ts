import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1778620787834 implements MigrationInterface {
    name = 'Init1778620787834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`estudiante_toma_oferta_entity\` DROP FOREIGN KEY \`FK_fec1f76048c7d7ace5f5537b053\``);
        await queryRunner.query(`ALTER TABLE \`matricula_entity\` DROP FOREIGN KEY \`FK_666dc13fd8c06040e8c7c435546\``);
        await queryRunner.query(`CREATE TABLE \`usuario_entity\` (\`ID_estudiante\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`nombre\` varchar(100) NOT NULL, \`apellido\` varchar(100) NOT NULL, \`email\` varchar(150) NOT NULL, \`activo\` tinyint NOT NULL DEFAULT 1, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`rut\` varchar(12) NOT NULL, \`nacionalidad\` varchar(100) NOT NULL, \`sexo\` enum ('M', 'F', 'O') NOT NULL, \`nacimiento\` date NOT NULL, \`direccion\` varchar(150) NOT NULL, \`telefono\` varchar(20) NOT NULL, \`password\` varchar(255) NOT NULL, \`rol\` enum ('estudiante', 'admin') NOT NULL, UNIQUE INDEX \`IDX_6082ea37fc8d89e467f2674e74\` (\`email\`), UNIQUE INDEX \`IDX_11f996a80ec36c69bbbadb6cee\` (\`rut\`), PRIMARY KEY (\`ID_estudiante\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`matricula_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`carrera_entity\` CHANGE \`duracion\` \`duracion\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`carrera_entity\` CHANGE \`cupos\` \`cupos\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`estudiante_toma_oferta_entity\` ADD CONSTRAINT \`FK_fec1f76048c7d7ace5f5537b053\` FOREIGN KEY (\`ID_estudiante\`) REFERENCES \`usuario_entity\`(\`ID_estudiante\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`matricula_entity\` ADD CONSTRAINT \`FK_666dc13fd8c06040e8c7c435546\` FOREIGN KEY (\`ID_estudiante\`) REFERENCES \`usuario_entity\`(\`ID_estudiante\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`matricula_entity\` DROP FOREIGN KEY \`FK_666dc13fd8c06040e8c7c435546\``);
        await queryRunner.query(`ALTER TABLE \`estudiante_toma_oferta_entity\` DROP FOREIGN KEY \`FK_fec1f76048c7d7ace5f5537b053\``);
        await queryRunner.query(`ALTER TABLE \`carrera_entity\` CHANGE \`cupos\` \`cupos\` int NOT NULL DEFAULT '100'`);
        await queryRunner.query(`ALTER TABLE \`carrera_entity\` CHANGE \`duracion\` \`duracion\` int NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`matricula_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP INDEX \`IDX_11f996a80ec36c69bbbadb6cee\` ON \`usuario_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_6082ea37fc8d89e467f2674e74\` ON \`usuario_entity\``);
        await queryRunner.query(`DROP TABLE \`usuario_entity\``);
        await queryRunner.query(`ALTER TABLE \`matricula_entity\` ADD CONSTRAINT \`FK_666dc13fd8c06040e8c7c435546\` FOREIGN KEY (\`ID_estudiante\`) REFERENCES \`estudiante_entity\`(\`ID_estudiante\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`estudiante_toma_oferta_entity\` ADD CONSTRAINT \`FK_fec1f76048c7d7ace5f5537b053\` FOREIGN KEY (\`ID_estudiante\`) REFERENCES \`estudiante_entity\`(\`ID_estudiante\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
