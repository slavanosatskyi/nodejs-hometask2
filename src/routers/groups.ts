import express, { Request, Response } from 'express';
import { validate as uuidValidate } from 'uuid';
import { GroupDal } from '../data-access';
import { buildErrorMessage, logger } from '../logger';
import { GroupService } from '../services';
import { Group, GroupDTO, GroupParams } from '../types/group';
import { validateGroupSchema } from '../validationMiddleware';
import { ENDPOINTS } from './endpoints';

const groupsRoute = express.Router();
const groupsService = new GroupService(new GroupDal());

groupsRoute.param('id', (req, res, next, id) => {
    if (!uuidValidate(id)) {
        const error = 'not valid uuid';
        logger.log({
            level: 'error',
            message: buildErrorMessage(req, error)
        });
        res.status(404).json('not valid uuid');
    } else {
        next();
    }
});

groupsRoute.get(
    ENDPOINTS.GROUPS,
    async (req: Request<object, object, object>, res: Response) => {
        const result = await groupsService.getAllGroups();
        res.json(result);
    }
);

groupsRoute.post(
    ENDPOINTS.GROUPS,
    validateGroupSchema,
    async (req: Request<Record<string, string>, Group, GroupDTO>, res: Response) => {
        try {
            const newGroup = await groupsService.createGroup(req.body);
            res.json(newGroup);
        } catch (err) {
            logger.log({
                level: 'error',
                message: buildErrorMessage(req, err)
            });
            res.status(400).json(err);
        }
    }
);

groupsRoute
    .route(`${ENDPOINTS.GROUPS}/add-users`)
    .post(
        async (
            req: Request<Record<string, string>, unknown, { groupId: string; userIds: string[] }>,
            res
        ) => {
            try {
                const result = await groupsService.addUsersToGroup(req.body.groupId, req.body.userIds);
                res.json(result);
            } catch (err) {
                logger.log({
                    level: 'error',
                    message: buildErrorMessage(req, err)
                });
                res.status(400).json((err as object).toString());
            }
        }
    );

groupsRoute
    .route(`${ENDPOINTS.GROUPS}/:id`)
    .get(async (req, res) => {
        try {
            const group = await groupsService.getGroupById(req.params.id);
            res.json(group);
        } catch (err) {
            logger.log({
                level: 'error',
                message: buildErrorMessage(req, err)
            });
            res.status(404).json(err);
        }
    })
    .put(
        validateGroupSchema,
        async (req: Request<GroupParams, Group, GroupDTO>, res) => {
            try {
                const updatedGroup = await groupsService.updateGroupById(
                    req.params.id,
                    req.body
                );
                res.json(updatedGroup);
            } catch (err) {
                logger.log({
                    level: 'error',
                    message: buildErrorMessage(req, err)
                });
                res.status(400).json(err);
            }
        }
    )
    .delete(async (req, res) => {
        try {
            const result = await groupsService.deleteGroupById(req.params.id);
            res.json(result);
        } catch (err) {
            logger.log({
                level: 'error',
                message: buildErrorMessage(req, err)
            });
            res.status(400).json(err);
        }
    });

export { groupsRoute };
