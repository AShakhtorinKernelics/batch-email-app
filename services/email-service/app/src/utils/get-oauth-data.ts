import { TransportOptions } from "nodemailer";

export const getOauthData = (userEmail: string, userRefreshToken: string): TransportOptions => {
    return {
        service: "Gmail",
        auth: {
            type: 'OAuth2',
            user: userEmail,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: userRefreshToken,
        }
    } as TransportOptions;
}
