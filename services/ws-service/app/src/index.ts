import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import { errorHandler, NotFoundError } from './common/src';
import { natsWrapper } from "./nats-wrapper";
import { healthRouter } from "./routes/health";
import { getWSConnectionByIdRouter } from "./routes/get-ws-connection-by-id";
import { getWSConnectionListRouter } from "./routes/get-ws-connection-list";
import { EmailSentListener } from './events/listeners/email-sent-listener';
import { HealthCheckListener } from './events/listeners/health-check-listener';
const cors = require("cors");
// import cookieSession from "cookie-session";
const app = express();
import expressWs from 'express-ws'
const wsApp = expressWs(app);
import { createWSRouter } from "./routes/create-ws";

app.set('trust proxy', true);
app.use(json());
app.use(cors());
/* app.use(cookieSession({
    signed: false,
    secure: true
})); */

app.use(healthRouter);
app.use(createWSRouter);
app.use(getWSConnectionByIdRouter);
app.use(getWSConnectionListRouter);

app.get('*', () => {
    throw new NotFoundError();
})

app.use(errorHandler);

const start = async () => {
    /* 
        if ( !process.env.JWT_KEY ) {
            throw new Error('No JWT_KEY key found');
        } */
    /* if ( !process.env.MONGO_URI ) {
        throw new Error('No MONGO_URI key found');
    } */
    /*  if ( !process.env.NATS_CLUSTER_ID ) {
         throw new Error('No NATS_CLUSTER_ID key found');
     }
     if ( !process.env.NATS_CLIENT_ID ) {
         throw new Error('No NATS_CLIENT_ID key found');
     }
     if ( !process.env.NATS_URL ) {
         throw new Error('No NATS_URL key found');
     }
  */
    try {
        /* await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID,
            process.env.NATS_CLIENT_ID,
            process.env.NATS_URL
        ); */
        /* 
                natsWrapper.client.on('close', () => {
                    console.log('NATS connection closed');
                    process.exit();
                });
        
                process.on('SIGINT', () => natsWrapper.client.close()); // interrupt signal may not work on windows
                process.on('SIGTERM', () => natsWrapper.client.close()); // terminate signal may not work on windows
         */
        new EmailSentListener(natsWrapper.client, wsApp).listen();
        new HealthCheckListener(natsWrapper.client).listen();
        /* await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }); */
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log(err);
    }

    /* app.listen(80, () => {
        console.log('Ws is succesfully running');
    }); */
    app.listen(4001, () => {
        console.log('Ws is succesfully running');
    });
}

start();
