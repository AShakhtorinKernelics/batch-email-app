import express, { Response, Request } from "express";
import { Connection } from '../models/connection';

const router = express.Router();

router.get('/api/ws/:id', async (req: Request, res: Response) => {

    const sessionId = req.params.id;

    const connection = await Connection.findBySessionId(sessionId);

    // Get Connection By ID

    res.status(200).send(JSON.stringify({
        connection
    }));
});

export { router as getWSConnectionByIdRouter };
