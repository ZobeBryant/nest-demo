import {MigrationInterface, QueryRunner} from "typeorm";

export class SchemaSync1656486354105 implements MigrationInterface {
    name = 'SchemaSync1656486354105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`);
        await queryRunner.query(`ALTER TABLE "coffee" ALTER COLUMN "title" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" ALTER COLUMN "title" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"`);
    }

}
