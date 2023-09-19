import {MigrationInterface, QueryRunner} from "typeorm";

export class rewards1640020264786 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "reward_audit_entry" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "activity" character varying NOT NULL, "type" character varying NOT NULL, "rewards" integer NOT NULL DEFAULT '0', "note" text DEFAULT null, "id" SERIAL NOT NULL, "customerId" integer, "orderId" integer, CONSTRAINT "PK_17ab75be21eb11b1aafa5fc87ad" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "reward_audit_entry" ADD CONSTRAINT "FK_3c24d3c2c74957d178d04590cb8" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "reward_audit_entry" ADD CONSTRAINT "FK_93a0c32a3001b754ae1fc432577" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "reward_audit_entry" DROP CONSTRAINT "FK_93a0c32a3001b754ae1fc432577"`, undefined);
        await queryRunner.query(`ALTER TABLE "reward_audit_entry" DROP CONSTRAINT "FK_3c24d3c2c74957d178d04590cb8"`, undefined);
        await queryRunner.query(`DROP TABLE "reward_audit_entry"`, undefined);
   }

}
