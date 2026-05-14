import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn, VirtualColumn } from "typeorm";
import { Standard } from "../enums/StudentEnums";
import { StudentMarks } from "./StudentMarks";

@Entity()
@Unique("unique_roll_per_standard", ["standard", "roll_no"])
export class Student {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    roll_no!: number;

    @Column({
        enum: Standard,
        type: "enum",
        enumName: "standard_enum",
    })
    standard!: Standard;

    @Column({ type: "date" })
    date_of_birth!: string;

    @VirtualColumn({
        query: (alias) => `DATE_PART('year', AGE(CURRENT_DATE, ${alias}.date_of_birth))::int`,
    })
    age: number;

    @OneToMany(() => StudentMarks, (marks: StudentMarks) => marks.student)
    marks!: StudentMarks[];

    @CreateDateColumn({ type: "timestamptz" })
    created_at!: Date;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at!: Date;
}
