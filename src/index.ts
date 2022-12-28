import express from 'express';
import { userRoute, usersRoute } from './routes';

const PORT = 3000;

const app = express();

app.use(express.json());
app.use('/', userRoute);
app.use('/', usersRoute);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
