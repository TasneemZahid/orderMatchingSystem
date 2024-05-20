import 'reflect-metadata';
import { createConnection, ConnectionOptions } from 'typeorm';
import express from 'express';
import bodyParser from 'body-parser';
import orderRoutes from './routes/orderRoutes';
import config from '../src/models/db'; // Import the config

createConnection(config as ConnectionOptions).then(() => {
    const app = express();
    const port = 3000;

    app.use(bodyParser.json());
    app.use('/api', orderRoutes);

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch(error => console.log('TypeORM connection error: ', error));
