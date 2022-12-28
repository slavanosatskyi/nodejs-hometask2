import express, { Request } from 'express';
import { createUser, deleteUserById, getUserById, updateUserById } from '../data';
import { User, UserData } from '../interfaces';
import { ENDPOINTS } from './endpoints';

type UserParams = {
  id: string;
};

type UserReqBody = {
    userData: UserData
};

const userRoute = express.Router();

userRoute.post(ENDPOINTS.USER, (req: Request<null, User, UserReqBody>, res) => {
    const newUser = createUser(req.body.userData);
    res.json(newUser);
});

userRoute.param('id', (req, res, next, id) => {
    const user = getUserById(id);
    if (!user) {
        res.status(404).json({ message: `No user found with id=${id}` });
    } else {
        next();
    }
});

userRoute
    .route(`${ENDPOINTS.USER}/:id`)
    .get((req, res) => {
        const user = getUserById(req.params.id);
        res.json(user);
    })
    .put((req: Request<UserParams, User, UserReqBody>, res) => {
        const updatedUser = updateUserById(req.params.id, req.body.userData);
        res.json(updatedUser);
    })
    .delete((req, res) => {
        const deletedUser = deleteUserById(req.params.id);
        res.json(deletedUser);
    });

export {
    userRoute
};
