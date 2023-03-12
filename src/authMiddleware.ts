import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export function checkToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-access-token'] as string;
    if (!token) {
        return res.status(401).send({ message: 'No token provided' });
    }

    return jwt.verify(token, process.env.PRIVATE_KEY, (error) => {
        if (error) {
            return res.status(403).send({ message: 'Failed to authenticate token' });
        }

        return next();
    });
}
