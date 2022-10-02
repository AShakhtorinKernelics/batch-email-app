const { OAuth2Strategy } = require('passport-google-oauth');
import JWTStrategy from 'passport-jwt';
import { User } from '../models/User';
import { getGoogleStrategyConfig } from './';

export const GoogleAuthSetup = () => {
    const callback = async (accessToken: string, refreshToken: string, profile: any, cb: any) => {
        // console.log('profile');
        // console.log(profile);
        const displayName = profile.displayName;
        const userId = profile.id;
        const userEmails: { value: string, verified: boolean }[] = profile.emails;
        const userMainEmail = userEmails.find(
            (item: { value: string, verified: boolean }) => item.verified
        );

        const existingUser = await User.findOne({ googleId: userId });

        if (!existingUser) {
            const userData = await User.build({
                displayName: displayName,
                googleId: userId,
                refreshToken: refreshToken,
                userEmail: userMainEmail?.value || '',
                contacts: [],
                userWsConnectionId: ''
            });

            console.log('non existing user data');
            console.log(userData);

            return cb(null, userData);
        }
        if (existingUser && refreshToken) {
            const userData = await existingUser.set({
                refreshToken: refreshToken
            });
            return cb(null, userData);
        }

        // return cb(null, existingUser);
        // return cb(null, profile);
    }

    return new OAuth2Strategy(
        getGoogleStrategyConfig(), callback
    );
}

export const JWTAuthSetup = () => {
    return new JWTStrategy.Strategy(
        {
            jwtFromRequest: JWTStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET,
        },
        (jwtPayload, done) => {

            console.log('jwt Payload')
            console.log(jwtPayload);

            // add DB logic 

            if (!jwtPayload) {
                return done('No token found...');
            }

            return done(null, jwtPayload);
        }
    );
}