import express, { Response, Request } from "express";

const router = express.Router();

router.get('/api/ws/:id', (req: Request, res: Response) => {
    res.status(200).send('get WS connection by id works')
});

export { router as getWSConnectionByIdRouter };
