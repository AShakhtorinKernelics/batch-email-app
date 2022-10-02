export class AuthService {
    static readonly routes = {
        authUrl: {
            googleAuth: 'http://localhost:4000/auth/google'
        }
    };

    static googleAuth() {
        window.open(AuthService.routes.authUrl.googleAuth, "_self");
    }
}