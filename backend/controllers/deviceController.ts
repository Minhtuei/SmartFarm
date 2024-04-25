import { Device } from '@be/models';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { mqttController } from './mqttController';
import { Notification } from '@be/models';
import { User } from '@be/models';
export const getAllDevice = async (req: Request, res: Response) => {
    try {
        const userID = req.params.userID;
        const devices = await Device.find({ userID });
        res.status(StatusCodes.OK).json({ devices });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};
export const removeDeviceUser = async (req: Request, res: Response) => {
    try {
        const device = await Device.findOne({ adaFruitID: req.params.deviceID });
        if (!device) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Don't have device!" });
        }
        const user = await User.findById(device.userID);
        device.userID = undefined;
        device.deviceName = device.deviceType;
        await device.save();
        const newNotification = new Notification({
            context: `Thiết bị ${device?.deviceName} đã được xóa!`,
            notificationType: 'success',
            email: user?.email,
            deviceName: device.deviceName
        });
        await newNotification.save();
        return res.status(StatusCodes.OK).json({ message: 'Device updated', device });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};
export const updateDeviceUser = async (req: Request, res: Response) => {
    try {
        const device = await Device.findOne({ adaFruitID: req.params.deviceID });
        const user = await User.findById(req.body.userID);
        if (!device) {
            const newNotification = new Notification({
                context: `Thiết bị không tồn tại !`,
                notificationType: 'error',
                email: user?.email,
                deviceName: ''
            });
            await newNotification.save();
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Don't have device!" });
        }
        if (!device.userID && device.userID !== req.body.userID) {
            device.userID = req.body.userID;
            await device.save();
            const newNotification = new Notification({
                context: `Thiết bị ${device.deviceName} đã được thêm thành công !`,
                notificationType: 'success',
                email: user?.email,
                deviceName: device.deviceName
            });
            await newNotification.save();
            return res.status(StatusCodes.OK).json({ message: 'Device updated', device });
        }
        const newNotification = new Notification({
            context: `Thiết bị ${device.deviceName} đã có chủ sở hữu !`,
            notificationType: 'error',
            email: user?.email,
            deviceName: device.deviceName
        });
        await newNotification.save();
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Device not updated' });
    } catch (error) {
        const user = await User.findById(req.body.userID);
        const newNotification = new Notification({
            context: `Thiết bị không tồn tại !`,
            notificationType: 'error',
            email: user?.email,
            deviceName: ''
        });
        await newNotification.save();
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
        const adaFruitID = req.params.deviceID;
        const update = {
            $set: {
                deviceState: req.body.deviceState,
                lastValue: req.body.lastValue,
                updatedTime: req.body.updatedTime
            },
            $push: {
                environmentValue: {
                    createdTime: req.body.updatedTime,
                    value: req.body.lastValue
                }
            }
        };

        const device = await Device.findOneAndUpdate(
            { adaFruitID: adaFruitID },
            {
                ...update
            },
            {
                new: true
            }
        );

        await mqttController.UpdateDeviceInfo(adaFruitID, req.body);
        if (!device) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Don't have device!" });
        return res.status(StatusCodes.OK).json({ message: 'device updated : ', device });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};
export const updateDeviceInfos = async (req: Request, res: Response) => {
    try {
        const adaFruitID = req.params.deviceID;
        const device = await Device.findOne({ adaFruitID });
        if (!device) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Don't have device!" });
        }
        // Update device properties if they have changed in the request body
        if (req.body.deviceName && device.deviceName !== req.body.deviceName) {
            device.deviceName = req.body.deviceName;
        }
        if (req.body.minLimit && device.minLimit !== req.body.minLimit) {
            device.minLimit = req.body.minLimit;
        }
        if (req.body.maxLimit && device.maxLimit !== req.body.maxLimit) {
            device.maxLimit = req.body.maxLimit;
        }
        if (req.body.schedule && device.schedule !== req.body.schedule) {
            device.schedule = req.body.schedule;
        }
        await device.save();
        const user = await User.findById(device.userID);
        const newNotification = new Notification({
            context: `Cập nhật thông tin thiết bị ${device.deviceName} thành công !`,
            notificationType: 'success',
            email: user?.email,
            deviceName: device.deviceName
        });
        await newNotification.save();
        return res.status(StatusCodes.OK).json({ message: 'Device updated', device });
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
