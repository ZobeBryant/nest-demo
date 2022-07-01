import {MigrationInterface, QueryRunner} from "typeorm";

export class CoffeeRefactor1656478051644 implements MigrationInterface {

    // 迁移操作
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`,
        )
    }

    // 回滚
    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"`,
        )
    }

}
