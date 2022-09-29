import express, { Response, Request } from "express";
import nodemailer from "nodemailer";
import { getOauthData, mailBuilder } from "../utils";

const router = express.Router();

router.get('/mail/send', (req: Request, res: Response) => {
    try {
        const userEmail = ;
        const userRefreshToken = ;
        const transport = nodemailer.createTransport(
            getOauthData(
                userEmail,
                userRefreshToken
            )
        );

        const result = await transport.sendMail(
            mailBuilder('', '', '', '')
        );
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

export { router as mailRouter };
