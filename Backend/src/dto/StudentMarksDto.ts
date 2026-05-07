import { Subjects } from "../enums/MarksEnum";

export interface CreateStudentMarksDTO {
    subject: Subjects;
    score: number;
}

export interface StudentMarksParamsDTO {
    id?: number;
    student_id?: number;
}

export interface UpdateStudentMarksDTO {
    subject?: Subjects;
    score?: number;
}
