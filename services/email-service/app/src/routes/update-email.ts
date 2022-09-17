import express, { Response, Request } from "express";

const router = express.Router();

router.post('api/email/update', (req: Request, res: Response) => {
    res.status(200).send('update Email works')
});

export { router as updateEmailRouter };
