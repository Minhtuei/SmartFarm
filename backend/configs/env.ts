import { config as configEnv } from 'dotenv';
import { str, cleanEnv } from 'envalid';

configEnv();

export const envs = cleanEnv(process.env, {
    NODE_ENV: str<NodeEnv>({
        devDefault: 'development',
        choices: ['development', 'test', 'production']
    }),
    REFRESH_JWT_SECRET: str(),
    ACCESS_JWT_SECRET: str(),
    COOKIE_SECRET: str(),
    CORS_WHITE_LIST: str(),
    ADAFRUIT_IO_USERNAME: str(),
    ADAFRUIT_IO_KEY: str(),
    ADAFRUIT_IO_PASSWORD: str()
});

export const CORS_WHITE_LIST = envs.CORS_WHITE_LIST.split(',');
