export const passportGoogleCheckOptions = () => {
    return {
        session: false,
        failureRedirect: '/',
        failureMessage: true,
        accessType: 'offline',
    };
}

export const passportJWTCheckOptions = () => {
    return {
        session: false,
        failureRedirect: '/',
        failureMessage: true,
    };
}
