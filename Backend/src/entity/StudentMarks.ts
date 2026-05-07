import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Student } from "./Student";
import { Subjects } from "../enums/MarksEnum";

@Entity()
@Index("idx_student_marks_student_id", ["student"])
@Unique("unique_student_subject", ["student", "subject"])
export class StudentMarks {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Student, (student: Student) => student.marks, { onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: "student_id" })
    student!: Student;

    @Column({
        enum: Subjects,
        type: "enum",
        enumName: "subject_enum",
    })
    subject!: Subjects;

    @Column()
    score!: number;

    @CreateDateColumn({ type: "timestamptz" })
    created_at!: Date;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at!: Date;
}
