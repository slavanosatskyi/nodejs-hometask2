import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { usersRoute } from './routers';

const app = express();

app.use(express.json());
app.use('/', usersRoute);

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});

import './configDB';
