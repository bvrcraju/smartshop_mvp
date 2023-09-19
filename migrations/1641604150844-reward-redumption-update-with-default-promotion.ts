import {MigrationInterface, QueryRunner} from "typeorm";

export class rewardRedumptionUpdateWithDefaultPromotion1641604150844 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "promotion" ADD "customFieldsIsdefault" boolean NOT NULL DEFAULT false`, undefined);
        await queryRunner.query(`ALTER TABLE "promotion" ADD "customFieldsType" character varying(255) NOT NULL DEFAULT 'none'`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" ALTER COLUMN "customFieldsPurchaserewardsmutliplier" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" ALTER COLUMN "customFieldsRedeemrewardsmutliplier" TYPE double precision`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "global_settings" ALTER COLUMN "customFieldsRedeemrewardsmutliplier" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" ALTER COLUMN "customFieldsPurchaserewardsmutliplier" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "promotion" DROP COLUMN "customFieldsType"`, undefined);
        await queryRunner.query(`ALTER TABLE "promotion" DROP COLUMN "customFieldsIsdefault"`, undefined);
   }

}
