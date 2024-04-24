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
import { router as genAcc } from './routes/genAccRouter';
import { authenticate } from './services/authenticate';
import { Scheduler } from './handlers';
const session = require('express-session');

import { mqttController } from '@be/controllers';
const app = express();
app.use(express.json());
mqttClient.onConnect();
mqttClient.subscribe('#');

mqttController.GetDeViceInfo;
async function startScheduler() {
    try {
        await Scheduler();
    } catch (error) {
        console.error('Error running Scheduler:', error);
    }
    setTimeout(startScheduler, 1000);
}

startScheduler();
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
    app.use('/user', user);
    app.use('/device', authenticate, device);
    app.use('/notification', authenticate, notification);
    app.use('/gen', genAcc);
} catch (err) {
    console.error('fix: ------\n' + err + '\n-------------------\n');
}

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
    .catch((err: Error) => {
        console.error(`Error connecting to the database. \n${err}`);
    });
// const Notification = mongoose.model('Notification'); // Replace 'Notification' with your actual model name
// Notification.deleteMany({ email: 'test2@gmail.com' }).then(() => {
//     console.log('Deleted all notifications)');
// }
// );
