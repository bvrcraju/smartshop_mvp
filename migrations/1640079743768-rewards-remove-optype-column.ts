import {MigrationInterface, QueryRunner} from "typeorm";

export class rewardsRemoveOptypeColumn1640079743768 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "reward_audit_entry" DROP COLUMN "type"`, undefined);
        await queryRunner.query(`COMMENT ON COLUMN "reward_audit_entry"."note" IS NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "reward_audit_entry" ALTER COLUMN "note" SET DEFAULT null`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "reward_audit_entry" ALTER COLUMN "note" DROP DEFAULT`, undefined);
        await queryRunner.query(`COMMENT ON COLUMN "reward_audit_entry"."note" IS NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "reward_audit_entry" ADD "type" character varying NOT NULL`, undefined);
   }

}
