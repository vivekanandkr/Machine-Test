import express from "express";
import { createMark, deleteMark, getMarkById, getStudentMarks, updateMark } from "../controllers/mark.controller.js";
import { validate } from "../middlewares/validate.js";
import { createMarkBodySchema, createMarkParamsSchema, MarkParamsSchema, updateMarkSchema } from "../validations/mark.validation.js";

const router = express.Router();
router.get("/student/:student_id", validate(createMarkParamsSchema, "params"), getStudentMarks);
router.post("/student/:student_id", validate(createMarkParamsSchema, "params"), validate(createMarkBodySchema), createMark);
router.get("/:id", validate(MarkParamsSchema, "params"), getMarkById);
router.put("/:id", validate(MarkParamsSchema, "params"), validate(updateMarkSchema), updateMark);
router.delete("/:id", validate(MarkParamsSchema, "params"), deleteMark);

export default router;
