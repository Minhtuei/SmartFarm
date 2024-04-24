import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { validateEmail } from '@fe/utils';
import { User } from '@be/models';
import { Device } from '../models/device';
import { SendNotification } from './emailController';
import { Notification } from '@be/models';
export const getAllNotification = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
        }
        const notifications = await Notification.find({ email: user.email }).sort({ createdAt: -1 });
        res.status(StatusCodes.OK).json({ notifications });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};
export const getLatestNotification = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
        }
        const notification = await Notification.find({ email: user.email }).sort({ createdAt: -1 }).limit(5);
        res.status(StatusCodes.OK).json({ notification });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};
export const getNotificationByDevice = async (req: Request, res: Response) => {
    try {
        const email = req.params.email;
        const deviceName = req.params.deviceName;
        if (!email) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'error',
                message: 'Missing email!'
            });
        }
        if (!validateEmail(email)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'error',
                message: 'Invalid email!'
            });
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
        }
        const deviceNeeded = await Device.findOne({ userID: user._id, deviceName: deviceName });
        if (!deviceNeeded) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Device not found' });
        }
        const notifications = await Notification.find({ email: email, deviceName: deviceName });
        if (!notifications) return res.status(StatusCodes.OK).json({ message: "Don't have notifications!" });
        return res.status(StatusCodes.OK).json({ notifications });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

export const createNotification = async (req: Request, res: Response) => {
    try {
        const { email, deviceName } = req.body;
        if (!email) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'error',
                message: 'Missing email!'
            });
        }
        if (!validateEmail(email)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'error',
                message: 'Invalid email!'
            });
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
        }
        const deviceNeeded = await Device.findOne({ userID: user._id, deviceName: deviceName });
        if (!deviceNeeded) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Device not found' });
        }

        const notification = await Notification.create(req.body);
        const time = notification.createdAt;
        await SendNotification(req, res);
        return res.status(StatusCodes.CREATED).json({ notification, time });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

export const deleteNotification = async (req: Request, res: Response) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.notificationID);
        if (!notification) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Don't have notification!" });
        return res.status(StatusCodes.OK).json({ message: 'notification deleted : ', notification });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};
