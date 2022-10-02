import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import { natsWrapper } from "./nats-wrapper";
import { errorHandler, NotFoundError } from './common/src';
import {
    generateJWT,
    passportCheckOptions,
    GoogleAuthSetup,
    JWTAuthSetup
} from './utils';

// routes
import { healthRouter } from "./routes/health";
import { mailRouter } from "./routes/mail-router";

import passport from 'passport';
import cors from "cors";
import * as dotenv from 'dotenv';
import path from 'path';


dotenv.config({
    path: path.join(__dirname, '.env')
});

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cors({
    origin: process.env.CLIENT_ORIGIN
}));

app.use(passport.initialize());
passport.serializeUser((user: any, cb) => cb(null, user));
passport.deserializeUser((obj: any, cb) => cb(null, obj));
passport.use(GoogleAuthSetup());
passport.use(JWTAuthSetup());

app.use(healthRouter);
app.use(mailRouter);

app.get('/auth/google',
    passport.authenticate('google', passportCheckOptions())
);

app.get('/oauth2/redirect/google',
    passport.authenticate('google', passportCheckOptions()),
    (req, res) => {
        const token = generateJWT(req.user);
        // res.send({ jwt: token })
        // res.setHeader('Authorization', 'Bearer ' + token);
        res.cookie('jwt', token);
        res.redirect(process.env.CLIENT_ORIGIN + '/pending');
        // res.send('qwer asd');
    });

app.get('*', () => {
    throw new NotFoundError();
})

app.use(errorHandler);

const start = async () => {


    /* if ( !process.env.JWT_KEY ) {
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
    } */

    try {
        /* await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID,
            process.env.NATS_CLIENT_ID,
            process.env.NATS_URL
        ); */

        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed');
            process.exit();
        });

        process.on('SIGINT', () => natsWrapper.client.close()); // interrupt signal may not work on windows
        process.on('SIGTERM', () => natsWrapper.client.close()); // terminate signal may not work on windows

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
        console.log('Email is succesfully running');
    }); */
    app.listen(4000, () => {
        console.log('Email is succesfully running');
    });
}

start();
