import { NextFunction, Request, Response } from "express";
import { StudentRepository } from "../db/repository";
import HttpError from "../utils/HttpError";
import { CreateStudentDTO, StudentParamsDTO, StudentQueryDTO, UpdateStudentDTO } from "../dto/StudentDto";
import { SortBy } from "../enums/StudentEnums";
import SortOrder from "../enums/SortOrderEnum";

export const getStudents = async (req: Request, res: Response, next: NextFunction) => {
    const { query } = (req as any).validated as {
        query: StudentQueryDTO;
    };
    const { name, page = 1, limit = 10, sortBy = SortBy.created_at, order = SortOrder.DESC } = query;
    const offset = (page - 1) * limit;

    const queryBuilder = StudentRepository.createQueryBuilder("student");
    if (name) queryBuilder.andWhere("student.name ILIKE :name", { name: `%${name}%` });
    queryBuilder.orderBy(`student.${sortBy}`, order);
    queryBuilder.skip(offset).take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();
    return res.json({
        data,
        success: true,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    });
};

export const getStudentById = async (req: Request, res: Response, next: NextFunction) => {
    const { params } = (req as any).validated as {
        params: StudentParamsDTO;
    };
    const student = await StudentRepository.findOneBy({ id: params.id });

    if (!student) return next(new HttpError("Student not found.", 404));
    return res.status(200).json({
        data: student,
    });
};

export const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = (req as any).validated as {
        body: CreateStudentDTO;
    };
    const studentEntity = StudentRepository.create(body);
    const newStudent = await StudentRepository.save(studentEntity);
    return res.status(201).json({ success: true, data: newStudent });
};

export const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
    const { params, body } = (req as any).validated as {
        params: StudentParamsDTO;
        body: UpdateStudentDTO;
    };
    const student = await StudentRepository.preload({ id: params.id, ...body });
    if (!student) return next(new HttpError("Student not found", 404));
    const updatedStudent = await StudentRepository.save(student);
    return res.status(200).json({ success: true, data: updatedStudent });
};

export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
    const { params } = (req as any).validated as {
        params: StudentParamsDTO;
    };
    const student = await StudentRepository.findOneBy({ id: params.id });
    if (!student) return next(new HttpError("Student not found", 404));

    await StudentRepository.delete({ id: params.id });
    return res.status(204).json({
        statusCode: 204,
        message: "Student deleted successfully",
    });
};
