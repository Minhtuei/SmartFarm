import { envs } from '@be/configs/env';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { mqttClient } from '@be/services';
import { router as login } from './routes/auth/authRouter';
import { router as user } from './routes/userRouter';
import { router as device } from './routes/deviceRouter';
import { router as notification } from './routes/notificationRouter';
import { authenticate } from './services/authenticate';
const session = require('express-session');

import { mqttController } from '@be/controllers';
const app = express();
app.use(express.json());
const whitelist: string[] = ['http://localhost:3000', 'http://localhost:8080'];
// CORS_WHITE_LIST=["http://localhost:3000","http://localhost:8080"] <- .env
// Configure CORS options
const corsOptions: cors.CorsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin!) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true // Allow credentials (cookies, authorization headers) to be sent to the server
};

// Use the configured CORS middleware
app.use(cors(corsOptions));

// app.use(
//     cors({
//         origin: envs.CORS_WHITE_LIST,
//         credentials: true
//     })
// );
app.use(
    session({
        secret: 'dadn232',
        resave: false,
        saveUninitialized: true
    })
);
// routes
try {
    app.use('/login', login);
    app.use('/user', authenticate, user);
    app.use('/device', authenticate, device);
    app.use('/notification', authenticate, notification);
} catch (err) {
    console.error('fix: ------\n' + err + '\n-------------------\n');
}
mqttClient.onConnect();
// mqttClient.publish('Led_2', '100');
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
    .connect(url, connectionParams)
    .then(() => {
        console.log('Connected to database ');
    })
    .catch((err: Error) => {
        console.error(`Error connecting to the database. \n${err}`);
    });
