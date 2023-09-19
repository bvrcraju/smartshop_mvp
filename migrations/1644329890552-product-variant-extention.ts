import {MigrationInterface, QueryRunner} from "typeorm";

export class productVariantExtention1644329890552 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product_variant" ADD "customFieldsOriginalpricewithtax" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" ADD "customFieldsCostprice" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" ADD "customFieldsDimension_length" double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" ADD "customFieldsDimension_length_unit" character varying(255)`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" ADD "customFieldsDimension_breadth" double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" ADD "customFieldsDimension_breadth_unit" character varying(255)`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" ADD "customFieldsDimension_height" double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" ADD "customFieldsDimension_height_unit" character varying(255)`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" ADD "customFieldsDimension_weight" double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" ADD "customFieldsDimension_weight_unit" character varying(255)`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" ALTER COLUMN "customFieldsPurchaserewardsmutliplier" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" ALTER COLUMN "customFieldsRedeemrewardsmutliplier" TYPE double precision`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "global_settings" ALTER COLUMN "customFieldsRedeemrewardsmutliplier" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" ALTER COLUMN "customFieldsPurchaserewardsmutliplier" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" DROP COLUMN "customFieldsDimension_weight_unit"`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" DROP COLUMN "customFieldsDimension_weight"`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" DROP COLUMN "customFieldsDimension_height_unit"`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" DROP COLUMN "customFieldsDimension_height"`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" DROP COLUMN "customFieldsDimension_breadth_unit"`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" DROP COLUMN "customFieldsDimension_breadth"`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" DROP COLUMN "customFieldsDimension_length_unit"`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" DROP COLUMN "customFieldsDimension_length"`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" DROP COLUMN "customFieldsCostprice"`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" DROP COLUMN "customFieldsOriginalpricewithtax"`, undefined);
   }

}
