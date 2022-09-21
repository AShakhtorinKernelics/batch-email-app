import express, { Response, Request } from "express";

const router = express.Router();

router.get('/api/email/health', (req: Request, res: Response) => {
    res.status(200).send('Email service is alive')
});

export { router as healthRouter };
