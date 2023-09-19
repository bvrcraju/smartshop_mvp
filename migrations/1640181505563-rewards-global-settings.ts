import {MigrationInterface, QueryRunner} from "typeorm";

export class rewardsGlobalSettings1640181505563 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "global_settings" ADD "customFieldsSignuprewards" integer NOT NULL DEFAULT '1000'`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" ADD "customFieldsSpinwheelrewards" text NOT NULL DEFAULT '[5,0,50,0,10]'`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" ADD "customFieldsNumberofspinslimit" integer NOT NULL DEFAULT '1'`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" ADD "customFieldsNumberofspinslimitfrequency" character varying(255) NOT NULL DEFAULT '1d'`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" ADD "customFieldsPurchaserewardsmutliplier" double precision NOT NULL DEFAULT '1'`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" ADD "customFieldsRedeemrewardsmutliplier" double precision NOT NULL DEFAULT '1'`, undefined);
        await queryRunner.query(`COMMENT ON COLUMN "reward_audit_entry"."note" IS NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "reward_audit_entry" ALTER COLUMN "note" SET DEFAULT null`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "reward_audit_entry" ALTER COLUMN "note" DROP DEFAULT`, undefined);
        await queryRunner.query(`COMMENT ON COLUMN "reward_audit_entry"."note" IS NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" DROP COLUMN "customFieldsRedeemrewardsmutliplier"`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" DROP COLUMN "customFieldsPurchaserewardsmutliplier"`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" DROP COLUMN "customFieldsNumberofspinslimitfrequency"`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" DROP COLUMN "customFieldsNumberofspinslimit"`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" DROP COLUMN "customFieldsSpinwheelrewards"`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" DROP COLUMN "customFieldsSignuprewards"`, undefined);
   }

}
