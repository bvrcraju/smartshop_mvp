import {MigrationInterface, QueryRunner} from "typeorm";

export class productExtention1644331764442 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product" ADD "customFieldsVendor" character varying(255)`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "customFieldsDimension_length" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "customFieldsDimension_breadth" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "customFieldsDimension_height" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "customFieldsDimension_weight" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" ALTER COLUMN "customFieldsPurchaserewardsmutliplier" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" ALTER COLUMN "customFieldsRedeemrewardsmutliplier" TYPE double precision`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "global_settings" ALTER COLUMN "customFieldsRedeemrewardsmutliplier" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" ALTER COLUMN "customFieldsPurchaserewardsmutliplier" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "customFieldsDimension_weight" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "customFieldsDimension_height" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "customFieldsDimension_breadth" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "customFieldsDimension_length" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "customFieldsVendor"`, undefined);
   }

}
