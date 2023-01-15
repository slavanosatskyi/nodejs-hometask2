import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { FilterQueryParams, UserDTO } from './interfaces';

function errorResponse(schemaErrors: Joi.ValidationErrorItem[]) {
    const errors = schemaErrors.map((error) => {
        const { path, message } = error;
        return { path, message };
    });

    return {
        status: 'failed',
        errors
    };
}

export function validateSchema(schema: Joi.ObjectSchema<UserDTO>) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false
        });

        if (error?.isJoi) {
            res.status(400).json(errorResponse(error.details));
        } else {
            next();
        }
    };
}

export function validateUsersSearchParams(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { limit } = req.query as FilterQueryParams;
    if (limit && isNaN(parseInt(limit, 10))) {
        res.status(400).json('Wrong "limit" parameter, only numbers are accepted');
    } else {
        next();
    }
}
