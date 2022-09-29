export const passportCheckOptions = () => {
    return {
        session: false,
        failureRedirect: '/login',
        failureMessage: true,
        accessType: 'offline',
    };
}
