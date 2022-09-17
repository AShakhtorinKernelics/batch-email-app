import express, { Response, Request } from "express";

const router = express.Router();

router.get('api/email/list', (req: Request, res: Response) => {
    res.status(200).send('get Email list works')
});

export { router as getEmailRouter };
