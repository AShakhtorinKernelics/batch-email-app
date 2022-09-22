import express, { Response, Request } from "express";
import { Connection } from '../models/connection';

const router = express.Router();

router.get('/api/ws/list', async (req: Request, res: Response) => {

    const connectionList = await Connection.find({});

    console.log('list');
    console.log(connectionList);

    res.status(200).send(JSON.stringify({
        connectionList
    }));

    res.status(200).send('get WS connection list works')
});

export { router as getWSConnectionListRouter };
