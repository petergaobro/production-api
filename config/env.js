import {config} from 'dotenv';

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`});

export const {
    PORT,
    SERVER_URL,
    NODE_ENV,
    DB_URI,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    QSTASH_TOKEN,
    QSTASH_URL,
    EMAIL_ACCOUNT,
    EMAIL_PWD
} = process.env;