export const auth = {
    type: "OAuth2",
    user: "ashakhtorin@gmail.com",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
};

export const mailoptions = {
    from: "ashakhtorin@gmail.com",
    to: "ashakhtorin@gmail.com",
    subject: "Gmail API NodeJS",
};