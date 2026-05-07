import express from "express";
import { createStudent, deleteStudent, getStudentById, getStudents, updateStudent } from "../controllers/student-controller";
import { validate } from "../middlewares/Validator";
import { createStudentBodySchema, StudentParamsSchema, StudentsQuerySchema, updateStudentSchema } from "../validations/student-validation";
import { StudentParamsDTO, CreateStudentDTO, StudentQueryDTO, UpdateStudentDTO } from "../dto/StudentDto";
import RequestPropertyEnum from "../enums/RequestPropertyEnum";

const StudentRoute = express.Router();
StudentRoute.get("/", validate<StudentQueryDTO>(StudentsQuerySchema, RequestPropertyEnum.query), getStudents);
StudentRoute.get("/:id", validate<StudentParamsDTO>(StudentParamsSchema, RequestPropertyEnum.params), getStudentById);
StudentRoute.post("/", validate<CreateStudentDTO>(createStudentBodySchema), createStudent);
StudentRoute.put("/:id", validate<StudentParamsDTO>(StudentParamsSchema, RequestPropertyEnum.params), validate<UpdateStudentDTO>(updateStudentSchema), updateStudent);
StudentRoute.delete("/:id", validate<StudentParamsDTO>(StudentParamsSchema, RequestPropertyEnum.params), deleteStudent);

export default StudentRoute;
