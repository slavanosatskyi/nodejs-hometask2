import express, { Request, Response } from 'express';
import { User, UserDTO, FilterQueryParams, UserParams } from '../interfaces';
import { userSchema } from '../schemas/userSchema';
import { ENDPOINTS } from './endpoints';
import {
    validateSchema,
    validateUsersSearchParams
} from '../validationMiddleware';
import { UserService } from '../services';
import { UserDal } from '../data-access';

const usersService = new UserService(new UserDal());
const usersRoute = express.Router();

usersRoute.param('id', (req, res, next, id) => {
    try {
        usersService.getUserById(id);
        next();
    } catch (err) {
        res.status(404).json(err);
    }
});

usersRoute.get(
    ENDPOINTS.USERS,
    validateUsersSearchParams,
    (req: Request<object, object, object, FilterQueryParams>, res: Response) => {
        const { loginSubstring, limit } = req.query;
        const result = usersService.getAutoSuggestUsers(
            loginSubstring ?? '',
            parseInt(limit ?? '', 10)
        );
        res.json(result);
    }
);

usersRoute.post(
    ENDPOINTS.USERS,
    validateSchema(userSchema),
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
        const user = await usersService.getUserById(req.params.id);
        res.json(user);
    })
    .put(
        validateSchema(userSchema),
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
