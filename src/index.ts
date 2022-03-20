require('dotenv').config();
import "reflect-metadata";//typeorm 
import { json, urlencoded } from "body-parser";
import cors from 'cors';
import express from 'express';
import bodyParser from "body-parser";
import logger from './utils/logger';
import MainController from "./controllers";
import { createConnection } from 'typeorm';

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.listen(process.env.PORT || 3000, async () => {
    logger.info(`Server started at PORT ${process.env.PORT} in ${process.env.NODE_ENV}`);


    createConnection().then(async connection => {
        logger.info(`connection synched`);
    }).catch(error => logger.error(`[connection error]: ${error}`));
});

app.use("/api", MainController);