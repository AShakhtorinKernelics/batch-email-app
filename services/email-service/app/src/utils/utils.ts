import { google } from "googleapis";

export const generateConfig = (url: string, accessToken: any) => {
    return {
        method: "get",
        url: url,
        headers: {
            Authorization: `Bearer ${accessToken} `,
            "Content-type": "application/json",
        },
    };
};

export const getOauthData = () => {
    const oAuth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URL
    );

    oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

    return oAuth2Client;
}