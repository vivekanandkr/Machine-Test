import { Request, Response, NextFunction } from "express";
import HttpError from "../utils/HttpError";
import { EntityNotFoundError, QueryFailedError } from "typeorm";

const GlobalErrorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === "development") console.error(err);
    if (err instanceof HttpError) {
        return res.status(err.statusCode).json({ error: err.message, success: false });
    } else if (err instanceof QueryFailedError) {
        const errorCode = (err as any).code;
        return res.status(400).json({
            message: "Database Error occured",
            errorCode,
            success: false,
        });
    } else if (err instanceof EntityNotFoundError) {
        return res.status(404).json({
            success: false,
            message: "Requested resource not found.",
        });
    }

    return res.status(500).json({
        message: "Internal server error",
        success: false,
    });
};

export default GlobalErrorHandler;
