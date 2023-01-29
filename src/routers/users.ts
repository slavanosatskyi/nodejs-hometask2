import express, { Request, Response } from 'express';
import { validate as uuidValidate } from 'uuid';
import { User, UserDTO, FilterQueryParams, UserParams } from '../types/user';
import { ENDPOINTS } from './endpoints';
import {
    validateUserSchema,
    validateUsersSearchParams
} from '../validationMiddleware';
import { UserService } from '../services';
import { UserDal } from '../data-access';

const usersService = new UserService(new UserDal());
const usersRoute = express.Router();

usersRoute.param('id', (req, res, next, id) => {
    if (!uuidValidate(id)) {
        res.status(404).json('not valid uuid');
    } else {
        next();
    }
});

usersRoute.get(
    ENDPOINTS.USERS,
    validateUsersSearchParams,
    async (req: Request<object, object, object, FilterQueryParams>, res: Response) => {
        const { loginSubstring, limit } = req.query;
        const result = await usersService.getAutoSuggestUsers(
            loginSubstring ?? '',
            limit ? parseInt(limit, 10) : undefined
        );
        res.json(result);
    }
);

usersRoute.post(
    ENDPOINTS.USERS,
    validateUserSchema,
    async (req: Request<unknown, User, UserDTO>, res: Response) => {
        try {
            const newUser = await usersService.createUser(req.body);
            res.json(newUser);
        } catch (err) {
            res.status(400).json(err);
        }
    }
);

usersRoute
    .route(`${ENDPOINTS.USERS}/:id`)
    .get(async (req, res) => {
        try {
            const user = await usersService.getUserById(req.params.id);
            res.json(user);
        } catch (err) {
            res.status(404).json(err);
        }
    })
    .put(
        validateUserSchema,
        async (req: Request<UserParams, User, UserDTO>, res) => {
            try {
                const updatedUser = await usersService.updateUserById(
                    req.params.id,
                    req.body
                );
                res.json(updatedUser);
            } catch (err) {
                res.status(400).json(err);
            }
        }
    )
    .delete(async (req, res) => {
        try {
            const deletedUser = await usersService.deleteUserById(req.params.id);
            res.json(deletedUser);
        } catch (err) {
            res.status(400).json(err);
        }
    });

export { usersRoute };
