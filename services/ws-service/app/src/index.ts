import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import { natsWrapper } from "./nats-wrapper";

import { healthRouter } from "./routes/health";
import { createWSRouter } from "./routes/create-email";
import { getWSConnectionRouter } from "./routes/get-ws-connection";
import cookieSession from "cookie-session";

const app = express();
app.set('trust proxy', true);
app.use(json());
/* app.use(cookieSession({
    signed: false,
    secure: true
})); */

app.use(healthRouter);
app.use(createWSRouter);
app.use(getWSConnectionRouter);

/* app.get('*', () => {
    throw new NotFoundError();
})

app.use(errorHandler); */

const start = async () => {
    if ( !process.env.JWT_KEY ) {
        throw new Error('No JWT_KEY key found');
    }
    if ( !process.env.MONGO_URI ) {
        throw new Error('No MONGO_URI key found');
    }
    if ( !process.env.NATS_CLUSTER_ID ) {
        throw new Error('No NATS_CLUSTER_ID key found');
    }
    if ( !process.env.NATS_CLIENT_ID ) {
        throw new Error('No NATS_CLIENT_ID key found');
    }
    if ( !process.env.NATS_URL ) {
        throw new Error('No NATS_URL key found');
    }

    try {
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID,
            process.env.NATS_CLIENT_ID,
            process.env.NATS_URL
        );

        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed');
            process.exit();
        });

        process.on('SIGINT', () => natsWrapper.client.close()); // interrupt signal may not work on windows
        process.on('SIGTERM', () => natsWrapper.client.close()); // terminate signal may not work on windows

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Connected to MongoDB');
    } catch ( err ) {
        console.log(err);
    }

    app.listen(80, () => {
        console.log('Auth is succesfully running');
    });
}

start();
