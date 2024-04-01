import { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/user';
import { UserToken } from '../models/userToken';
import { generateToken } from '../controllers/auth/authController';
dotenv.config();

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.header('Authorization');
        const refreshToken = req.header('Refresh-Token');

        if (!accessToken && !refreshToken) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access token or refresh token is required.' });
        }

        if (accessToken) {
            const secret = process.env.ACCESS_JWT_SECRET;
            const decoded = jwt.verify(accessToken.split(' ')[1], secret) as { email: string; exp: number }; // Extract expiry time
            const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
            if (decoded.exp < currentTime) {
                return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access token has expired. Please refresh.' });
            }
            req.email = decoded.email;
            return next();
        }

        if (refreshToken) {
            const secret = process.env.REFRESH_JWT_SECRET;
            const decoded = jwt.verify(refreshToken.split(' ')[1], secret) as { email: string };
            const userToken = await UserToken.findOne({ email: decoded.email, token: refreshToken });

            if (!userToken) {
                return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid refresh token.' });
            }

            const user = await User.findOne({ email: decoded.email });
            if (!user) {
                return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not found.' });
            }

            const newTokens = await generateToken(user); // Assuming generateToken function is available
            req.email = decoded.email;
            res.locals.newTokens = newTokens;
            return next();
        }
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token.', error: err });
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error.' });
    }
};

export { authenticate };
