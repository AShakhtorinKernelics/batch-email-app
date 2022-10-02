import express, { Response, Request } from "express";
import nodemailer from "nodemailer";
import { User } from "../models/User";
import {
    getNodemailerConfig,
    mailBuilder,
    toDecrypted,
    passportJWTCheckOptions
} from "../utils";
import jwt from 'jsonwebtoken';

const router = express.Router();

router.use('/mail', passportJWTCheckOptions);

router.post('/mail/send', async (req: Request, res: Response) => {
    try {
        const jwtToken = req.headers.authorization!;
        const userToken: any = jwt.decode(jwtToken);

        console.log('user');
        console.log(userToken);
        const { from, to, subject, text } = req.body;

        if (!from || !userToken.userId) {
            console.log('ADD THROW ERR LOGIC HERE!!!'); // TODO
        }

        const user = await User.findById(userToken.userId);

        if (!user) {
            console.log('ADD ERROR!!!'); // TODO
            throw new Error('custom on no user');
        }

        const transport = nodemailer.createTransport(
            getNodemailerConfig(
                from,
                toDecrypted(user.refreshToken, user.userEmail)
            )
        );

        const result = await transport.sendMail(
            mailBuilder(from, to, subject, text)
        );
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

export { router as mailRouter };
