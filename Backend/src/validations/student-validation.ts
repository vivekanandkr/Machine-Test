import JoiCore from "joi";
import JoiDate from "@joi/date";
import { SortBy, Standard } from "../enums/StudentEnums";
import SortOrder from "../enums/SortOrderEnum";
const Joi = JoiCore.extend(JoiDate);

export const createStudentBodySchema = Joi.object({
    name: Joi.string().required().trim().min(3).max(100).messages({
        "any.required": "Name is required",
        "string.empty": "Name cannot be empty",
        "string.min": "Name must be at least 3 characters",
        "string.max": "Name cannot exceed 100 characters",
    }),

    roll_no: Joi.number().required().integer().positive().messages({
        "any.required": "Roll number is required",
        "number.base": "Roll number must be a number",
        "number.integer": "Roll number must be an integer",
        "number.positive": "Roll number must be positive",
    }),

    standard: Joi.string()
        .required()
        .trim()
        .valid(...Object.values(Standard))
        .messages({
            "any.required": "Standard is required",
            "string.empty": "Standard cannot be empty",
            "any.only": `Standard must be one of: ${Object.values(Standard).join(", ")}`,
        }),

    date_of_birth: Joi.date().format("YYYY-MM-DD").max("now").required().messages({
        "any.required": "Date of birth is required",
        "date.format": "Date of birth must be a valid date",
        "date.max": "Date of birth cannot be in the future",
    }),
});

export const StudentParamsSchema = Joi.object({
    id: Joi.number().integer().positive().required().messages({
        "any.required": "Student ID is required",
        "number.base": "Student ID must be a number",
        "number.integer": "Student ID must be an integer",
        "number.positive": "Student ID must be positive",
    }),
});

export const updateStudentSchema = createStudentBodySchema
    .fork(["name", "roll_no", "standard", "date_of_birth"], (schema: JoiCore.ObjectSchema) => schema.optional())
    .min(1)
    .messages({
        "object.min": "At least one field must be provided for update",
    });

export const StudentsQuerySchema = Joi.object({
    page: Joi.number().integer().positive().optional().messages({
        "number.base": "Page must be a number",
        "number.integer": "Page must be an integer",
        "number.positive": "Page must be positive",
    }),

    limit: Joi.number().integer().positive().optional().messages({
        "number.base": "Limit must be a number",
        "number.integer": "Limit must be an integer",
        "number.positive": "Limit must be positive",
    }),
    sortBy: Joi.string()
        .optional()
        .trim()
        .valid(...Object.values(SortBy))
        .messages({
            "any.only": `sortBy must be one of: ${Object.values(SortBy)}`,
        }),

    order: Joi.string()
        .optional()
        .trim()
        .valid(...Object.values(SortOrder))
        .messages({
            "any.only": `Order must be one of: ${Object.values(SortBy)}`,
        }),
    name: Joi.string().optional().trim(),
});
