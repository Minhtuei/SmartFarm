import { envs } from '@be/configs/env';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { mqttClient } from '@be/services';
const app = express();
app.use(
    cors({
        origin: envs.CORS_WHITE_LIST,
        credentials: true
    })
);
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
