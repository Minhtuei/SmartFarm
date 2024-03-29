import { envs } from '@be/configs/env';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { mqttClient } from '@be/services';
import { mqttController } from '@be/controllers';
const app = express();
app.use(
    cors({
        origin: envs.CORS_WHITE_LIST,
        credentials: true
    })
);
mqttClient.onConnect();
mqttClient.publish('Led_2', '100');
mqttClient.subscribe('#');

mqttController.GetDeViceInfo;

app.use(bodyParser.json());
app.use(cookieParser(envs.COOKIE_SECRET));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const mongoose = require('mongoose');

const url = `mongodb+srv://dadn223:dadn223@dadn.jonmqsq.mongodb.net/?retryWrites=true&w=majority&appName=DADN`;

mongoose
    .connect(url)
    .then(() => {
        console.log('Connected to database ');
    })
    .catch((err: DOMException) => {
        console.error(`Error connecting to the database. \n${err}`);
    });
