import express, { Response, Request } from "express";

const router = express.Router();

router.get('api/ws/health', (req: Request, res: Response) => {
    res.status(200).send('WS service is alive')
});

export { router as healthRouter };
