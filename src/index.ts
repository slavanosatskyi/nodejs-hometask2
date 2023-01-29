import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { initModels } from './models';
import { groupsRoute, usersRoute } from './routers';

initModels();

const app = express();

app.use(express.json());
app.use('/', usersRoute);
app.use('/', groupsRoute);

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});
