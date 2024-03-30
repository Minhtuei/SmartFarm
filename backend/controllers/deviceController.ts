import Device from '../models/device';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

export const getAllDevice = async (req: Request, res: Response) => {
    try {
        const devices = await Device.find({ userID: req.params.userID });
        res.status(StatusCodes.OK).json({ devices });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

export const getDeviceInfo = async (req: Request, res: Response) => {
    try {
        const device = await Device.findById(req.params.id);
        if (!device) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Don't have device!" });
        return res.status(StatusCodes.OK).json({ device });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

export const createDevice = async (req: Request, res: Response) => {
    try {
        const device = await Device.create(req.body);
        return res.status(StatusCodes.CREATED).json({ device });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

export const updateDeviceInfo = async (req: Request, res: Response) => {
    try {
        const device = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!device) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Don't have device!" });
        return res.status(StatusCodes.OK).json({ message: 'device updated : ', device });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

export const deleteDevice = async (req: Request, res: Response) => {
    try {
        const device = await Device.findByIdAndDelete(req.params.id);
        if (!device) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Don't have device!" });
        return res.status(StatusCodes.OK).json({ message: 'device deleted : ', device });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

export const getValueByType = async (req: Request, res: Response) => {
    try {
        const device = await Device.findOne({ deviceType: 'sensor', sensorType: req.params.sensorType });
        if (!device) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Don't have device!" });
        return res.status(StatusCodes.OK).json({ value: device.environmentValue });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};
