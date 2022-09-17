import express, { Response, Request } from "express";

const router = express.Router();

router.post('api/email/create', (req: Request, res: Response) => {
    res.status(200).send('create Email works')
});

export { router as createEmailRouter };
