import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
require('dotenv').config();
import { validateEmail, validatePassword } from '@fe/utils';
import { User } from '@be/models';
import UserToken from 'backend/models/userToken';
import { UserDataType } from 'backend/types/user';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = async (user: UserDataType) => {
    try {
        if (!user || !user.email) {
            throw new Error('User email is required');
        }
        // console.log(process.env.ACCESS_JWT_SECRET);
        // console.log(process.env.REFRESH_JWT_SECRET);
        const payload = { email: user.email, id: user._id };
        const accessToken = jwt.sign(payload, process.env.ACCESS_JWT_SECRET, { expiresIn: '10m' });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_JWT_SECRET, { expiresIn: '30d' });

        const userToken = await UserToken.findOne({ email: user.email });
        // console.log(userToken);
        if (userToken) await UserToken.updateOne({ email: user.email });
        // console.log(user.email + ' : new token');
        await new UserToken({ email: user.email, token: refreshToken }).save();
        return Promise.resolve({ accessToken, refreshToken });
    } catch (err) {
        return Promise.reject(err);
    }
};

const login = async (req: Request, res: Response) => {
    try {
        // base64 decode the data: email, password
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'error',
                message: 'Request missing email or password'
            });
        }
        if (!validateEmail(email) && !validatePassword(password)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'error',
                message: 'The email or password invalid.'
            });
        }
        // Assuming the username is in req.body.name
        const user = await User.findOne({ email: email }); // Using findOne instead of findALL and awaiting the result
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Tài khoản không hợp lệ' });
        }
        // console.log(user);
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Sai mật khẩu' });
        }
        // Assuming you have user ID in the user object, adjust this accordingly based on your schema
        // const { email } = user;

        // Generate token
        const token = await generateToken(user);
        // req.session.token = token;
        // Send token in response
        return res
            .status(StatusCodes.OK)
            .json({ accessToken: token.accessToken, refreshToken: token.refreshToken, userInfo: { email: user.email, id: user._id } });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
};
const logout = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.header('Refresh-Token');

        // Mark the token as revoked
        await UserToken.updateOne({ token: refreshToken }, { revoked: true });

        return res.status(StatusCodes.OK).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
};
const updateToken = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.header('Refresh-Token');
        // console.log(req.headers);
        if (!refreshToken) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Refresh token is required.' });
        }

        const decoded = jwt.verify(refreshToken.split(' ')[1], process.env.REFRESH_JWT_SECRET) as { email: string };

        const accessToken = jwt.sign({ email: decoded.email }, process.env.ACCESS_JWT_SECRET, { expiresIn: '10m' });

        return res.status(StatusCodes.OK).json({ message: 'Token updated successfully', accessToken: accessToken });
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token.', error: err });
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error.' });
    }
};

export { generateToken, login, logout, updateToken };
