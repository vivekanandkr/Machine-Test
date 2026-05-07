import { type MigrationInterface, type QueryRunner } from "typeorm";

export class Init1778052237152 implements MigrationInterface {
    name = 'Init1778052237152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."standard_enum" AS ENUM('1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th')`);
        await queryRunner.query(`CREATE TABLE "student" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "roll_no" integer NOT NULL, "standard" "public"."standard_enum" NOT NULL, "date_of_birth" date NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "unique_roll_per_standard" UNIQUE ("standard", "roll_no"), CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."subject_enum" AS ENUM('Hindi', 'English', 'Marathi', 'Maths', 'Science', 'Social Science', 'General Knowledge')`);
        await queryRunner.query(`CREATE TABLE "student_marks" ("id" SERIAL NOT NULL, "subject" "public"."subject_enum" NOT NULL, "score" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "student_id" integer, CONSTRAINT "unique_student_subject" UNIQUE ("student_id", "subject"), CONSTRAINT "PK_2b0b8fff6a616d090e7d6c109a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_student_marks_student_id" ON "student_marks" ("student_id") `);
        await queryRunner.query(`ALTER TABLE "student_marks" ADD CONSTRAINT "FK_8c7c269796e05ed11b5d7bb2da2" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_marks" DROP CONSTRAINT "FK_8c7c269796e05ed11b5d7bb2da2"`);
        await queryRunner.query(`DROP INDEX "public"."idx_student_marks_student_id"`);
        await queryRunner.query(`DROP TABLE "student_marks"`);
        await queryRunner.query(`DROP TYPE "public"."subject_enum"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TYPE "public"."standard_enum"`);
    }

}
