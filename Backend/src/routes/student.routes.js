import express from "express";
import { createStudent, getStudents, getStudentById, updateStudent, deleteStudent } from "../controllers/student.controller.js";
import { validate } from "../middlewares/validate.js";
import { createStudentBodySchema, getStudentsQuerySchema, StudentParamsSchema, updateStudentSchema } from "../validations/student.validation.js";

const router = express.Router();
router.post("/", validate(createStudentBodySchema), createStudent);
router.get("/", validate(getStudentsQuerySchema, "query"), getStudents);
router.get("/:id", validate(StudentParamsSchema, "params"), getStudentById);
router.put("/:id", validate(StudentParamsSchema, "params"), validate(updateStudentSchema), updateStudent);
router.delete("/:id", validate(StudentParamsSchema, "params"), deleteStudent);

export default router;
