import express, { Response, Request } from "express";

const router = express.Router();

router.get('/api/ws/list', (req: Request, res: Response) => {
    res.status(200).send('get WS connection list works')
});

export { router as getWSConnectionListRouter };
