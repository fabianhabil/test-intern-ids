import { useExpressServer, useContainer } from 'routing-controllers';
import helmet from 'helmet';
import express from 'express';
import config from './configs/config';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import 'reflect-metadata';
import { Container } from 'typedi';
import path from 'node:path';
import { ErrorMiddleware } from './middlewares/error.middleware';
import { LoggerMiddleware } from './middlewares/logger.middleware';

const app = express();

// global middlewares
app.use(compression());
app.use(helmet());
app.use(cookieParser());
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );

    // Request headers you wish to allow
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type'
    );

    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Pass to next layer of middleware
    next();
});
app.use('/public/images', express.static(path.join(__dirname, 'images')));

useContainer(Container);

useExpressServer(app, {
    cors: config.cors,
    controllers: [path.join(__dirname, '/controllers/**/*.controller.{js,ts}')],
    middlewares: [ErrorMiddleware, LoggerMiddleware],
    defaultErrorHandler: false,
    validation: {
        forbidUnknownValues: true,
        stopAtFirstError: true
    },
    development: config.isDev
});

export default app;
