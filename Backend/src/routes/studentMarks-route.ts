import express from "express";
import { validate } from "../middlewares/Validator";
import { CreateStudentMarksDTO, StudentMarksParamsDTO, UpdateStudentMarksDTO } from "../dto/StudentMarksDto";
import RequestPropertyEnum from "../enums/RequestPropertyEnum";
import { createMarkBodySchema, createMarkParamsSchema, MarkParamsSchema, updateMarkSchema } from "../validations/studentMarks-validation";
import { createStudentmark, deleteStudentMarks, getStudentMarks, getStudentMarksById, updateStudentMark } from "../controllers/studentMarks-controller";
const StudentMarksRoutes = express.Router();

StudentMarksRoutes.get("/student/:student_id", validate<StudentMarksParamsDTO>(createMarkParamsSchema, RequestPropertyEnum.params), getStudentMarks);
StudentMarksRoutes.post(
    "/student/:student_id",
    validate<StudentMarksParamsDTO>(createMarkParamsSchema, RequestPropertyEnum.params),
    validate<CreateStudentMarksDTO>(createMarkBodySchema),
    createStudentmark,
);
StudentMarksRoutes.get("/:id", validate<StudentMarksParamsDTO>(MarkParamsSchema, RequestPropertyEnum.params), getStudentMarksById);
StudentMarksRoutes.put("/:id", validate<StudentMarksParamsDTO>(MarkParamsSchema, RequestPropertyEnum.params), validate<UpdateStudentMarksDTO>(updateMarkSchema), updateStudentMark);
StudentMarksRoutes.delete("/:id", validate<StudentMarksParamsDTO>(MarkParamsSchema, RequestPropertyEnum.params), deleteStudentMarks);

export default StudentMarksRoutes;
