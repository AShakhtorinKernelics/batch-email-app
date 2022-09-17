import express, { Response, Request } from "express";

const router = express.Router();

router.post('api/ws/create', (req: Request, res: Response) => {
    res.status(200).send('create WS works')
});

export { router as createWSRouter };
