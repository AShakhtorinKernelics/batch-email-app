import express, { Response, Request } from "express";
import { WebSocketEvents } from './../constants/ws-actions';
import { Connection } from '../models/connection';
import { v4 as uuidv4 } from 'uuid';
import { ConnectionEstablishedPublisher } from "../events/publishers/connection-established-event";
import { natsWrapper } from '../nats-wrapper';
import { ConnectionLostPublisher } from "../events/publishers/connection-lost-event";

const router = express.Router();

router.ws('/ws', function (ws: any, req: any) {
    const uuid = uuidv4();
    ws.sessionId = uuid;
    // console.log(req);
    // Handle new row in DB
    const connection = new Connection({
        id: uuid,
        userId: 'userId',
        ip: 'ip'
    });

    // TODO queue stream event -> connection succeded

    console.log('connection object before save');
    console.log(connection);
    if (connection) {
        connection.save();
        /* new ConnectionEstablishedPublisher(natsWrapper.client).publish({
            sessionId: uuid,
            userId: connection.userId
        }); */
    }


    ws.on('message', function (msg: any) {
        const { data, action } = JSON.parse(msg);

        switch (action) {
            case WebSocketEvents.ON.ECHO: {
                ws.send(
                    JSON.stringify({
                        message: data
                    })
                );
                break;
            }
        }
    });

    ws.on('close', async function (event: any) {
        console.log('close');
        // get connection id from event
        const sessionId = ws.sessionId;
        console.log('sessionId');
        console.log(sessionId);
        const connection = await Connection.findBySessionId(sessionId);

        if (connection) {
            connection.delete();
            new ConnectionLostPublisher(natsWrapper.client).publish({
                sessionId: uuid,
                userId: connection.userId
            });
        }

        // TODO queue stream connection lost
    });
});

export { router as createWSRouter };
