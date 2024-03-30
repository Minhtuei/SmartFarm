import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authenticate = (req: Request, res: Response, next: Any) => {
    const secret = process.env.JWT_SECRET;
    const token = req.header('Authorization');

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Authorization token is required.' });
    }
    try {
        const decoded = jwt.verify(token?.split(' ')[1], secret);
        req.email = decoded.email;
        next();
    } catch (err) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token.' });
    }
};

export { authenticate };
