import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1609164489957 implements MigrationInterface {
    name = 'migration1609164489957'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "create_date" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "update_date" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "username" character varying NOT NULL, "password" character varying NOT NULL, "peopleId" uuid, CONSTRAINT "REL_e2e38b1d0096ee56deaa6d6f55" UNIQUE ("peopleId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "people" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "create_date" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "update_date" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "firtName" character varying NOT NULL, "lastName" character varying NOT NULL, CONSTRAINT "PK_aa866e71353ee94c6cc51059c5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_e2e38b1d0096ee56deaa6d6f559" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_e2e38b1d0096ee56deaa6d6f559"`);
        await queryRunner.query(`DROP TABLE "people"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
