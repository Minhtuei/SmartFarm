import path from 'path';

import mongoose from 'mongoose';
import winston from 'winston';
import { envs } from '@be/configs/env';
class MongoServer {
    private readonly _logger: winston.Logger;
    private static _instance: MongoServer;
    private constructor() {
        this._logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    filename: path.join(__dirname, '../logs.log'),
                    level: 'info'
                })
            ]
        });
        mongoose
            .connect(envs.DB_ENDPOINT)
            .then(() => this._logger.info('MongoDB connection established successfully'))
            .catch((e: mongoose.Error) => this._logger.error(`MongoDB connection failed with error: ${e}`));
        // const Notification = mongoose.model('Notification'); // Replace 'Notification' with your actual model name
        // Notification.deleteMany({ email: 'test2@gmail.com' }).then(() => {
        //     console.log('Deleted all notifications)');
        // }
        // );
    }

    static getInstance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new MongoServer();
        return this._instance;
    }

    public get logger() {
        return this._logger;
    }
}

export default MongoServer;
