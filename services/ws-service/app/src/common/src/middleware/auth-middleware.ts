import { Response, Request, NextFunction } from "express";

export function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}
