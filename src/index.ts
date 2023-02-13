import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import { buildErrorMessage, buildMessage, getErrorDescription, logger } from './logger';
import { initModels } from './models';
import { groupsRoute, usersRoute } from './routers';

initModels();

const app = express();

app.use(express.json());
app.use((req, res, next) => {
    const message = buildMessage(req);
    logger.log({
        level: 'info',
        message
    });
    next();
});

app.use('/', usersRoute);
app.use('/', groupsRoute);
app.use((err: unknown, req: Request, res: Response) => {
    logger.log({ level: 'error', message: buildErrorMessage(req, err) });
    res.status(500).send('Fatal sever error');
});

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});

process
    .on('uncaughtException', (error) => {
        logger.log({ level: 'error', message: `uncaughtException: ${error.message}` });
        logger.log({ level: 'error', message: error.stack || 'No info about stack' });
    })
    .on('unhandledRejection', (error) => {
        logger.log({ level: 'error', message: `unhandledRejection: ${getErrorDescription(error)}` });
    });
