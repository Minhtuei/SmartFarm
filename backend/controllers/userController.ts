import { User } from '../models/user';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { validateEmail } from '@fe/utils';

export const getUserInfo = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Don't have user!" });
        return res.status(StatusCodes.OK).json({ user });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

export const updateUserInfo = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate({ email: req.params.email }, req.body, { new: true });
        if (!user) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Don't have user!" });
        return res.status(StatusCodes.OK).json({ message: 'user updated : ', user });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

export const createUser = async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!validateEmail(email)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: 'error',
            message: 'Invalid email!'
        });
    }
    try {
        await User.create({ email: email });
        return res.status(StatusCodes.OK).json({ email: email });
    } catch (error) {
        console.log(error);
    }
};
