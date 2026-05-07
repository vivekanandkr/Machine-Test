import { NextFunction, Request, Response } from "express";
import { StudentRepository, StudentMarksRepository } from "../db/repository";
import { CreateStudentMarksDTO, StudentMarksParamsDTO, UpdateStudentMarksDTO } from "../dto/StudentMarksDto";
import HttpError from "../utils/HttpError";

export const getStudentMarks = async (req: Request, res: Response, next: NextFunction) => {
    const { params } = (req as any).validated as {
        params: StudentMarksParamsDTO;
    };

    const student = await StudentRepository.findOneBy({ id: params.student_id });
    if (!student) return next(new HttpError("Student not found", 404));

    const studentMarks = await StudentMarksRepository.find({
        where: {
            student: {
                id: student.id,
            },
        },
    });
    return res.json({ success: true, data: studentMarks });
};

export const createStudentmark = async (req: Request, res: Response, next: NextFunction) => {
    const { params, body } = (req as any).validated as {
        params: StudentMarksParamsDTO;
        body: CreateStudentMarksDTO;
    };
    const student = await StudentRepository.findOneBy({ id: params.student_id });
    if (!student) return next(new HttpError("Student not found", 404));

    const studentMarkEntity = StudentMarksRepository.create({ ...body, student });
    const newMark = await StudentMarksRepository.save(studentMarkEntity);
    return res.status(201).json({ success: true, data: newMark });
};

export const getStudentMarksById = async (req: Request, res: Response, next: NextFunction) => {
    const { params } = (req as any).validated as {
        params: StudentMarksParamsDTO;
    };

    const student = await StudentRepository.findOneBy({ id: params.id });
    if (!student) return next(new HttpError("Student not found", 404));
    return res.json({ success: true, data: student });
};

export const updateStudentMark = async (req: Request, res: Response, next: NextFunction) => {
    const { params, body } = (req as any).validated as {
        params: StudentMarksParamsDTO;
        body: UpdateStudentMarksDTO;
    };

    const studentMarks = await StudentMarksRepository.preload({ id: params.id, ...body });
    if (!studentMarks) return next(new HttpError("Student Mark not found", 404));
    const updatedStudentMark = await StudentMarksRepository.save(studentMarks);
    return res.status(200).json({ success: true, data: updatedStudentMark });
};

export const deleteStudentMarks = async (req: Request, res: Response, next: NextFunction) => {
    const { params } = (req as any).validated as {
        params: StudentMarksParamsDTO;
    };
    const studentMark = await StudentMarksRepository.findOneBy({ id: params.id });
    if (!studentMark) return next(new HttpError("Student Mark not found", 404));

    await StudentMarksRepository.delete({ id: params.id });
    return res.status(204).json({
        statusCode: 204,
        message: "Student Mark deleted successfully",
    });
};
