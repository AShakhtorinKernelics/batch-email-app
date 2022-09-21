import express, { Response, Request } from "express";

const router = express.Router();

router.ws('/ws', function (ws: any, req: any) {
    ws.on('message', function (msg: any) {
        console.log('msg');
        console.log(msg);
        ws.send(
            JSON.stringify({
                message: msg
            })
        );
    });
});

export { router as createWSRouter };
