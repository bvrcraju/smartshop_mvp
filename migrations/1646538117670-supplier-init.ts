import {MigrationInterface, QueryRunner} from "typeorm";

export class supplierInit1646538117670 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "supplier_address" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fullName" character varying NOT NULL DEFAULT '', "company" character varying NOT NULL DEFAULT '', "streetLine1" character varying NOT NULL, "streetLine2" character varying NOT NULL DEFAULT '', "city" character varying NOT NULL DEFAULT '', "province" character varying NOT NULL DEFAULT '', "postalCode" character varying NOT NULL DEFAULT '', "phoneNumber" character varying NOT NULL DEFAULT '', "defaultShippingAddress" boolean NOT NULL DEFAULT false, "defaultBillingAddress" boolean NOT NULL DEFAULT false, "id" SERIAL NOT NULL, "supplierId" integer, "countryId" integer, CONSTRAINT "PK_f472086d71f41d27230e009d71f" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "supplier_bank_account" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "accountHolderName" character varying NOT NULL DEFAULT '', "ifscCode" character varying NOT NULL DEFAULT '', "accountNumber" character varying NOT NULL, "accountType" character varying NOT NULL DEFAULT '', "id" SERIAL NOT NULL, "supplierId" integer, CONSTRAINT "PK_8bf31dc8905c8ded5062317683a" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "supplier" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "storeName" character varying NOT NULL, "contactPersonFullName" character varying NOT NULL, "phoneNumber" character varying NOT NULL DEFAULT '', "emailAddress" character varying NOT NULL, "gstNumber" character varying NOT NULL, "panNumber" character varying NOT NULL, "documentsPath" character varying NOT NULL, "id" SERIAL NOT NULL, "channelId" integer, CONSTRAINT "REL_3add3c56701b1d04b436a04944" UNIQUE ("channelId"), CONSTRAINT "PK_2bc0d2cab6276144d2ff98a2828" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "customFieldsDimension_length" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "customFieldsDimension_breadth" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "customFieldsDimension_height" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "customFieldsDimension_weight" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" ALTER COLUMN "customFieldsPurchaserewardsmutliplier" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" ALTER COLUMN "customFieldsRedeemrewardsmutliplier" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "supplier_address" ADD CONSTRAINT "FK_c4a94c0736dce4a47f9764ae97a" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "supplier_address" ADD CONSTRAINT "FK_b3596a02c09d8c2f8f8343890f3" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "supplier_bank_account" ADD CONSTRAINT "FK_8dea81e015e3e7546ec5a854601" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "supplier" ADD CONSTRAINT "FK_3add3c56701b1d04b436a04944a" FOREIGN KEY ("channelId") REFERENCES "channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "supplier" DROP CONSTRAINT "FK_3add3c56701b1d04b436a04944a"`, undefined);
        await queryRunner.query(`ALTER TABLE "supplier_bank_account" DROP CONSTRAINT "FK_8dea81e015e3e7546ec5a854601"`, undefined);
        await queryRunner.query(`ALTER TABLE "supplier_address" DROP CONSTRAINT "FK_b3596a02c09d8c2f8f8343890f3"`, undefined);
        await queryRunner.query(`ALTER TABLE "supplier_address" DROP CONSTRAINT "FK_c4a94c0736dce4a47f9764ae97a"`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" ALTER COLUMN "customFieldsRedeemrewardsmutliplier" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "global_settings" ALTER COLUMN "customFieldsPurchaserewardsmutliplier" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "customFieldsDimension_weight" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "customFieldsDimension_height" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "customFieldsDimension_breadth" TYPE double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "customFieldsDimension_length" TYPE double precision`, undefined);
        await queryRunner.query(`DROP TABLE "supplier"`, undefined);
        await queryRunner.query(`DROP TABLE "supplier_bank_account"`, undefined);
        await queryRunner.query(`DROP TABLE "supplier_address"`, undefined);
   }

}
