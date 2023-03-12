import express from 'express';
import jwt from 'jsonwebtoken';
import { UserDal } from '../data-access';
import { UserService } from '../services';
import { ENDPOINTS } from './endpoints';

const authenticateRoute = express.Router();
const usersService = new UserService(new UserDal());

authenticateRoute.post(ENDPOINTS.AUTH, async (req, res) => {
    const { login, password } = req.body;
    const user = await usersService.findUserByLogin(login);

    if (!user || user.password !== password) {
        return res.status(401).send({ message: 'wrong login/password' });
    }

    const token = jwt.sign({ sub: user.login }, process.env.PRIVATE_KEY);
    return res.json({ token });
});

export { authenticateRoute };
