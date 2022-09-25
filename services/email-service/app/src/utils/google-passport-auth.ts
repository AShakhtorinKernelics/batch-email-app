const { OAuth2Strategy } = require('passport-google-oauth');

const tempUserDB = new Map();

export const GoogleAuthSetup = () => {
    const callback = (accessToken: string, refreshToken: string, profile: any, cb: any) => {
        console.log('accessToken');
        console.log(accessToken);
        console.log('refresh token');
        console.log(refreshToken);
        console.log('profile');
        console.log(profile);
        const displayName = profile.displayName;
        const userId = profile.id;
        const userEmails = profile.emails; // [ {value: '', verified: true } ]
        return cb(null, profile);
    }


    const GoogleConfig = {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/oauth2/redirect/google',
        scope: ['email', 'profile']
    };

    return new OAuth2Strategy(GoogleConfig, callback);
}