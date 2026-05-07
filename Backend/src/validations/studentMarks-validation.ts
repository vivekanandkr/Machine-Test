import Joi from "joi";
import { Subjects } from "../enums/MarksEnum";
export const createMarkParamsSchema = Joi.object({
    student_id: Joi.number().integer().positive().required().messages({
        "any.required": "Student ID is required",
        "number.base": "Student ID must be a number",
        "number.integer": "Student ID must be an integer",
        "number.positive": "Student ID must be positive",
    }),
});
export const MarkParamsSchema = Joi.object({
    id: Joi.number().integer().positive().required().messages({
        "any.required": "Mark ID is required",
        "number.base": "Mark ID must be a number",
        "number.integer": "Mark ID must be an integer",
        "number.positive": "Mark ID must be positive",
    }),
});
export const createMarkBodySchema = Joi.object({
    subject: Joi.string()
        .required()
        .valid(...Object.values(Subjects))
        .messages({
            "any.required": "Subject is required",
            "string.empty": "Subject cannot be empty",
            "any.only": `Subject must be one of: ${Object.values(Subjects)}`,
        }),

    score: Joi.number().integer().min(0).max(100).required().messages({
        "any.required": "Score is required",
        "number.base": "Score must be a number",
        "number.min": "Score cannot be less than 0",
        "number.max": "Score cannot be more than 100",
    }),
});

export const updateMarkSchema = createMarkBodySchema
    .fork(["subject", "score"], (schema) => schema.optional())
    .min(1)
    .messages({
        "object.min": "At least one field must be provided for update",
    });
