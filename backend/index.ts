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
const session = require('express-session');

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: envs.CORS_WHITE_LIST,
        credentials: true
    })
);
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
    app.use('/device', device);
    app.use('/notification', notification);
} catch (err) {
    console.error('fix: ------\n' + err + '\n-------------------\n');
}
mqttClient.onConnect();
mqttClient.publish('test', 'Hello from backend');
mqttClient.subscribe('test');
mqttClient.onMessage((topic, message) => {
    console.log('Received message from topic', topic, message);
});
app.use(bodyParser.json());
app.use(cookieParser(envs.COOKIE_SECRET));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const mongoose = require('mongoose');

const url = `mongodb+srv://dadn223:dadn223@dadn.jonmqsq.mongodb.net/?retryWrites=true&w=majority&appName=DADN`;

// const connectionParams = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// };

mongoose
    .connect(url)
    .then(() => {
        console.log('Connected to database ');
    })
    .catch((err: Error) => {
        console.error(`Error connecting to the database. \n${err}`);
    });
