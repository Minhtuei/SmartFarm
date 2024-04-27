import { User } from '../models/user';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
const bcrypt = require('bcrypt');
import { validateEmail, validatePassword } from '@fe/utils';

export const getUserInfo = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.email });
        if (!user) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Don't have user!" });
        return res.status(StatusCodes.OK).json({ user });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

export const updateUserInfo = async (req: Request, res: Response) => {
    try {
        if (req.body.password !== undefined) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const user = await User.findOneAndUpdate({ email: req.email }, req.body, { new: true });
        if (!user) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Don't have user!" });
        return res.status(StatusCodes.OK).json({ message: 'user updated: ', user });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

export const createUser = async (req: Request, res: Response) => {
    const email = req.body.email;
    if (!validateEmail(email)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: 'error',
            message: 'Invalid email!'
        });
    }
    try {
        const password = req.body.password;
        if (!validatePassword(password)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'error',
                message: 'Invalid Password!'
            });
        }
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'error',
                message: 'The user is exist in the database!'
            });
        }
        req.body.password = await bcrypt.hash(req.body.password, 10);
        await User.create(req.body);
        return res.status(StatusCodes.OK).json(req.body);
    } catch (error) {
        console.log(error);
    }
};
