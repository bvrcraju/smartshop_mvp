import {MigrationInterface, QueryRunner} from "typeorm";

export class rewardsTiersSettings1640237540706 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "global_settings" ADD "customFieldsRewardtiers" text NOT NULL DEFAULT '["blue:0 - 10000","silver:10001 - 50000","gold:50001 - 100000","platinum:100001 - 500000","diamond:500001 - 1000000","master:1000001 - 5000000"]'`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" ALTER COLUMN "customFieldsPurchaserewardsmutliplier" TYPE double precision`, undefined);
        await queryRunner.query(`COMMENT ON COLUMN "global_settings"."customFieldsPurchaserewardsmutliplier" IS NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" ALTER COLUMN "customFieldsRedeemrewardsmutliplier" TYPE double precision`, undefined);
        await queryRunner.query(`COMMENT ON COLUMN "global_settings"."customFieldsRedeemrewardsmutliplier" IS NULL`, undefined);
        await queryRunner.query(`COMMENT ON COLUMN "reward_audit_entry"."note" IS NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "reward_audit_entry" ALTER COLUMN "note" SET DEFAULT null`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "reward_audit_entry" ALTER COLUMN "note" DROP DEFAULT`, undefined);
        await queryRunner.query(`COMMENT ON COLUMN "reward_audit_entry"."note" IS NULL`, undefined);
        await queryRunner.query(`COMMENT ON COLUMN "global_settings"."customFieldsRedeemrewardsmutliplier" IS NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" ALTER COLUMN "customFieldsRedeemrewardsmutliplier" TYPE double precision`, undefined);
        await queryRunner.query(`COMMENT ON COLUMN "global_settings"."customFieldsPurchaserewardsmutliplier" IS NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" ALTER COLUMN "customFieldsPurchaserewardsmutliplier" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" DROP COLUMN "customFieldsRewardtiers"`, undefined);
   }

}
