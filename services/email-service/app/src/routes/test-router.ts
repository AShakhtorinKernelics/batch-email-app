import express, { Response, Request } from "express";
import { generateConfig, getOauthData } from "./../utils/utils";
import { auth, mailoptions } from "../constants/constants";
const nodemailer = require("nodemailer");
const axios = require("axios");

const router = express.Router();

async function sendMail(req: Request, res: Response) {
    try {
        const accessToken = await getOauthData().getAccessToken();
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                ...auth,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            ...mailoptions,
            text: "The Gmail API with NodeJS works",
        };

        const result = await transport.sendMail(mailOptions);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

async function getUser(req: Request, res: Response) {
    try {

        console.log('PORT');
        console.log(process.env.PORT);

        const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/profile`;
        const { token } = await getOauthData().getAccessToken();
        const config = generateConfig(url, token);
        console.log(config);
        const response = await axios(config);
        res.json(response.data);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

async function getDrafts(req: Request, res: Response) {
    try {
        const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/drafts`;
        const { token } = await getOauthData().getAccessToken();
        const config = generateConfig(url, token);
        const response = await axios(config);
        res.json(response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function readMail(req: Request, res: Response) {
    try {
        const url = `https://gmail.googleapis.com//gmail/v1/users/sid.cd.varma@gmail.com/messages/${req.params.messageId}`;
        const { token } = await getOauthData().getAccessToken();
        const config = generateConfig(url, token);
        const response = await axios(config);

        let data = await response.data;
    } catch (error) {
        res.send(error);
    }
}

router.get('/mail/user/:email', getUser)
router.get('/mail/send', sendMail);
router.get('/mail/drafts/:email', getDrafts);
router.get('/mail/read/:messageId', readMail);

export { router as testRouter };
