import {MigrationInterface, QueryRunner} from "typeorm";

export class channelCustomFields1638520424796 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "channel" ADD "iconId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "channel" ADD "customFieldsAddress" text`, undefined);
        await queryRunner.query(`ALTER TABLE "channel" ADD CONSTRAINT "FK_62645ea245f2bc1ebeeda56da81" FOREIGN KEY ("iconId") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "channel" DROP CONSTRAINT "FK_62645ea245f2bc1ebeeda56da81"`, undefined);
        await queryRunner.query(`ALTER TABLE "channel" DROP COLUMN "customFieldsAddress"`, undefined);
        await queryRunner.query(`ALTER TABLE "channel" DROP COLUMN "iconId"`, undefined);
   }

}
