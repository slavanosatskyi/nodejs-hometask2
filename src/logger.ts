import { Request } from 'express';
import winston, { format } from 'winston';

export const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({ format: winston.format.simple() })
    ],
    format: format.combine(format.simple(), format.colorize())
});

export function buildMessage(req: Request) {
    let message = `Method name: ${req.path}, type: ${req.method}`;
    if (req.body) {
        message = `${message}, ${JSON.stringify(req.body)}`;
    }

    return message;
}

export function getErrorDescription(error: unknown) {
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === 'string') {
        return error;
    }
    throw 'Not support error type';
}

export function buildErrorMessage(req: Request, error: unknown) {
    const errorDescription = getErrorDescription(error);
    const message = buildMessage(req);
    return `${errorDescription}; ${message}`;
}
