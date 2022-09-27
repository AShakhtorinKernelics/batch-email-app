import jwt from 'jsonwebtoken';

export const generateJWT = (user: any) => {
    const secret: string = process.env.SECRET!;
    const token = jwt.sign(user, secret, {
        expiresIn: '7d',
    });
    return token;
};