require('dotenv').config();
import "reflect-metadata";//typeorm 
import { json, urlencoded } from "body-parser";
import cors from 'cors';
import express from 'express';
import bodyParser from "body-parser";
import { VaccinationController } from "./controllers";
import { createConnection } from 'typeorm';


const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.listen(process.env.PORT || 3000, async () => {
    console.log(`Server started, listening to port ${process.env.PORT}, env ${process.env.node_env} `);

    /*createConnection().then(async connection => {
        console.log(`connection synched`);
    }).catch(error => console.log(error));*/
});

app.use("/api/", VaccinationController);

app.get("/healthcheck", async (req,res)=>{

    return res.json("working");
})