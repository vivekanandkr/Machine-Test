import AppDataSource from "..";
import { Student } from "../../entity/Student";
import { StudentMarks } from "../../entity/StudentMarks";

export const StudentRepository = AppDataSource.getRepository(Student);
export const StudentMarksRepository = AppDataSource.getRepository(StudentMarks);
