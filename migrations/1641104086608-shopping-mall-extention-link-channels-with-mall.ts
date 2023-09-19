import {MigrationInterface, QueryRunner} from "typeorm";

export class shoppingMallExtentionLinkChannelsWithMall1641104086608 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "channel" ADD "featuredMallId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "channel" ADD "bannerImageId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "channel" ADD "customFieldsNote" text`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" ALTER COLUMN "customFieldsPurchaserewardsmutliplier" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" ALTER COLUMN "customFieldsRedeemrewardsmutliplier" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "channel" ADD CONSTRAINT "FK_8f062f3de77d9383dab1c0a5813" FOREIGN KEY ("featuredMallId") REFERENCES "shopping_mall"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "channel" ADD CONSTRAINT "FK_fa37221ed74d5aef45541209783" FOREIGN KEY ("bannerImageId") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "channel" DROP CONSTRAINT "FK_fa37221ed74d5aef45541209783"`, undefined);
        await queryRunner.query(`ALTER TABLE "channel" DROP CONSTRAINT "FK_8f062f3de77d9383dab1c0a5813"`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" ALTER COLUMN "customFieldsRedeemrewardsmutliplier" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" ALTER COLUMN "customFieldsPurchaserewardsmutliplier" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "channel" DROP COLUMN "customFieldsNote"`, undefined);
        await queryRunner.query(`ALTER TABLE "channel" DROP COLUMN "bannerImageId"`, undefined);
        await queryRunner.query(`ALTER TABLE "channel" DROP COLUMN "featuredMallId"`, undefined);
   }

}
