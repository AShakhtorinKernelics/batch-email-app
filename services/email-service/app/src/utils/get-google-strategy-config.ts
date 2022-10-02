import { googleScope, googleCallbackURL } from "../constants";

export const getGoogleStrategyConfig = () => {
    return {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: googleCallbackURL,
        scope: googleScope
    };
}
