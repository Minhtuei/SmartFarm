import Notification from '../models/notification';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

export const getAllNotification = async (req: Request, res: Response) => {
    try {
        const notifications = await Notification.find({ userID: req.params.userID });
        res.status(StatusCodes.OK).json({ notifications });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

export const getNotificationByDevice = async (req: Request, res: Response) => {
    try {
        const notifications = await Notification.find({ userID: req.params.userID, deviceID: req.params.deviceID });
        if (!notifications) return res.status(StatusCodes.OK).json({ message: "Don't have notifications!" });
        return res.status(StatusCodes.OK).json({ notifications });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

export const createNotification = async (req: Request, res: Response) => {
    try {
        const notification = await Notification.create(req.body);
        return res.status(StatusCodes.CREATED).json({ notification });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

export const deleteNotification = async (req: Request, res: Response) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.notificationID);
        if (!notification) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Don't have notification!" });
        return res.status(StatusCodes.OK).json({ message: 'device deleted : ', notification });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};
