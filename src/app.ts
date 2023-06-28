import express from 'express';
import { createDatabaseConnection } from './database/connection';

const app = express();

app.use(express.json());

app.listen(3000, async () => {
    console.log('server starts');
    //connect to the database using typeorm
    try {
        await createDatabaseConnection()
    } catch (err) {
        console.log('connection error not able to connect server', err);
    }
})















