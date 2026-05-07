import { type MigrationInterface, type QueryRunner } from "typeorm";

export class FixStudentIdNull1778052477897 implements MigrationInterface {
    name = "FixStudentIdNull1778052477897";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_marks" DROP CONSTRAINT "FK_8c7c269796e05ed11b5d7bb2da2"`);
        await queryRunner.query(`ALTER TABLE "student_marks" DROP CONSTRAINT "unique_student_subject"`);
        await queryRunner.query(`ALTER TABLE "student_marks" ALTER COLUMN "student_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student_marks" ADD CONSTRAINT "unique_student_subject" UNIQUE ("student_id", "subject")`);
        await queryRunner.query(
            `ALTER TABLE "student_marks" ADD CONSTRAINT "FK_8c7c269796e05ed11b5d7bb2da2" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_marks" DROP CONSTRAINT "FK_8c7c269796e05ed11b5d7bb2da2"`);
        await queryRunner.query(`ALTER TABLE "student_marks" DROP CONSTRAINT "unique_student_subject"`);
        await queryRunner.query(`ALTER TABLE "student_marks" ALTER COLUMN "student_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student_marks" ADD CONSTRAINT "unique_student_subject" UNIQUE ("subject", "student_id")`);
        await queryRunner.query(
            `ALTER TABLE "student_marks" ADD CONSTRAINT "FK_8c7c269796e05ed11b5d7bb2da2" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
    }
}
