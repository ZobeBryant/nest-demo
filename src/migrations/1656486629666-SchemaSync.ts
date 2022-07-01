import {MigrationInterface, QueryRunner} from "typeorm";

export class SchemaSync1656486629666 implements MigrationInterface {
    name = 'SchemaSync1656486629666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "test"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" ADD "test" character varying`);
    }

}
