import express, { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import {
    createUser,
    deleteUserById,
    getAllUsers,
    getUserById,
    updateUserById
} from '../data';
import { User, UserData } from '../interfaces';
import { userSchema } from '../schemas/userSchema';
import { ENDPOINTS } from './endpoints';

type UserParams = {
  id: string;
};

const noUserFoundMessage = (id: string) => `No user found with id=${id}`;
const notUniqueLoginMessage = (login: string) => `Such user already exists ${login}`;

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

function validateSchema(schema: Joi.ObjectSchema<UserData>) {
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

function checkUniqueLogin(login: string) {
    return !getAllUsers().some((user) => user.login === login);
}

const userRoute = express.Router();

userRoute.param('id', (req, res, next, id) => {
    const user = getUserById(id);
    if (!user) {
        res.status(404).json({ message: noUserFoundMessage(id) });
    } else {
        next();
    }
});

userRoute.post(
    ENDPOINTS.USER,
    validateSchema(userSchema),
    (req: Request<unknown, User, UserData>, res: Response) => {
        if (!checkUniqueLogin(req.body.login)) {
            res.status(400).json({ message: notUniqueLoginMessage(req.body.login) });
        } else {
            res.json(createUser(req.body));
        }
    }
);

userRoute
    .route(`${ENDPOINTS.USER}/:id`)
    .get((req, res) => {
        res.json(getUserById(req.params.id));
    })
    .put(
        validateSchema(userSchema),
        (req: Request<UserParams, User, UserData>, res) => {
            const currentUser = getUserById(req.params.id);
            if (
                currentUser?.login !== req.body.login && !checkUniqueLogin(req.body.login)
            ) {
                res.status(400)
                    .json({ message: notUniqueLoginMessage(req.body.login) });
            } else {
                res.json(updateUserById(req.params.id, req.body));
            }
        }
    )
    .delete((req, res) => {
        res.json(deleteUserById(req.params.id));
    });

export { userRoute };
