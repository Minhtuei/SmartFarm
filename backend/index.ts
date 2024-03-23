import { envs } from '@be/configs/env';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
const app = express();
app.use(
    cors({
        origin: envs.CORS_WHITE_LIST,
        credentials: true
    })
);
app.use(bodyParser.json());
app.use(cookieParser(envs.COOKIE_SECRET));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const mongoose = require('mongoose');

const url = `mongodb+srv://dadn223:dadn223@dadn.jonmqsq.mongodb.net/?retryWrites=true&w=majority&appName=DADN`;

const connectionParams = {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
};
mongoose
    .connect(url, connectionParams)
    .then(() => {
        console.log('Connected to database ');
    })
    .catch((err: DOMException) => {
        console.error(`Error connecting to the database. \n${err}`);
    });
