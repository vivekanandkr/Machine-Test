import { NextFunction, Request, Response } from "express";
import HttpError from "../utils/HttpError";
import Joi from "joi";
import RequestPropertyEnum from "../enums/RequestPropertyEnum";

export interface ValidatedRequest<TBody = unknown, TParams = unknown, TQuery = unknown> extends Request {
    validated: {
        body: TBody;
        params: TParams;
        query: TQuery;
    };
}

export const validate = <T>(schema: Joi.ObjectSchema, property: RequestPropertyEnum = RequestPropertyEnum.body) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req[property], {
            abortEarly: false,
            stripUnknown: true,
            convert: true,
        });

        if (error) {
            const messages = error.details.map((d) => d.message).join(", ");
            return next(new HttpError(messages, 400));
        }

        const reqWithValidated = req as ValidatedRequest;

        reqWithValidated.validated = {
            body: reqWithValidated.validated?.body ?? ({} as any),
            params: reqWithValidated.validated?.params ?? ({} as any),
            query: reqWithValidated.validated?.query ?? ({} as any),
            [property]: value,
        };

        next();
    };
};
