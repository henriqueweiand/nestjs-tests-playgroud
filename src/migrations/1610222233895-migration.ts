import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1610222233895 implements MigrationInterface {
    name = 'migration1610222233895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "deletedAt" TIMESTAMP DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "people" ADD "deletedAt" TIMESTAMP DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_e2e38b1d0096ee56deaa6d6f559"`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."create_date" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."update_date" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "peopleId" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."peopleId" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "people"."create_date" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "people"."update_date" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_e2e38b1d0096ee56deaa6d6f559" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_e2e38b1d0096ee56deaa6d6f559"`);
        await queryRunner.query(`COMMENT ON COLUMN "people"."update_date" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "people"."create_date" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."peopleId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "peopleId" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."update_date" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."create_date" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_e2e38b1d0096ee56deaa6d6f559" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "people" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedAt"`);
    }

}
