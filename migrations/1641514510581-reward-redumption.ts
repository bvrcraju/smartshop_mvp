import {MigrationInterface, QueryRunner} from "typeorm";

export class rewardRedumption1641514510581 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "global_settings" ADD "customFieldsMinimumrewardsbalance" integer NOT NULL DEFAULT '1000'`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" ALTER COLUMN "customFieldsPurchaserewardsmutliplier" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" ALTER COLUMN "customFieldsRedeemrewardsmutliplier" TYPE double precision`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "global_settings" ALTER COLUMN "customFieldsRedeemrewardsmutliplier" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" ALTER COLUMN "customFieldsPurchaserewardsmutliplier" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" DROP COLUMN "customFieldsMinimumrewardsbalance"`, undefined);
   }

}
