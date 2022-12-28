import express, { Request } from 'express';
import { getAutoSuggestUsers } from '../data';
import { User } from '../interfaces';
import { ENDPOINTS } from './endpoints';

type FilterQueryParams = {
    loginSubstring?: string;
    limit?: string;
}

function parseFilterQueryParams(params: FilterQueryParams) {
    const { loginSubstring, limit } = params;
    let limitNumber: number | undefined = parseInt(limit ?? '',  10);
    limitNumber = isNaN(limitNumber) ? undefined : limitNumber;

    return { loginSubstring: loginSubstring ?? '', limit:  limitNumber };
}

const usersRoute = express.Router();

usersRoute.get(ENDPOINTS.USERS, (req: Request<null, User[], null, FilterQueryParams>, res) => {
    const { loginSubstring, limit } = parseFilterQueryParams(req.query);
    const result = getAutoSuggestUsers(loginSubstring, limit);
    res.json(result);
});

export {
    usersRoute
};
