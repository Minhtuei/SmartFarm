import { Device } from '@be/models';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { mqttController } from './mqttController';
import { Notification } from '@be/models';
import { User } from '@be/models';
export const getAllDevice = async (req: Request, res: Response) => {
    try {
        const userID = req.params.userID;
        const devices = await Device.find({ userID }).slice('environmentValue', -20);
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
export const removeManyDevice = async (req: Request, res: Response) => {
    try {
        const deviceIDs = req.body.deviceIDs;
        const devices = await Device.find({ adaFruitID: { $in: deviceIDs } });
        if (!devices) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Don't have device!" });
        const user = await User.findById(devices[0].userID);
        devices.forEach(async (device) => {
            device.userID = undefined;
            device.deviceName = device.deviceType;
            await device.save();
            const newNotification = new Notification({
                context: `Thiết bị ${device.deviceName} đã được xóa!`,
                notificationType: 'success',
                email: user?.email,
                deviceName: device.deviceName
            });
            await newNotification.save();
        });
        return res.status(StatusCodes.OK).json({ message: 'Device updated', devices });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

export const updateDeviceUser = async (req: Request, res: Response) => {
    try {
        const deviceIDs = req.body.deviceIDs.split(',');
        const regex = /^[0-9]{7}$/;
        const user = await User.findById(req.body.userID);
        const invalidDeviceIDs = deviceIDs.filter((deviceID: string) => !regex.test(deviceID));
        if (invalidDeviceIDs.length > 0) {
            invalidDeviceIDs.forEach(async (deviceID: string) => {
                const newNotification = new Notification({
                    context: `Lỗi khi thêm thiết bị: mã thiết bị ${deviceID} không hợp lệ !`,
                    notificationType: 'error',
                    email: user?.email,
                    deviceName: 'Hệ thống'
                });
                await newNotification.save();
            });
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Device ID is invalid' });
        }

        const devices = await Promise.all(deviceIDs.map((deviceID: string) => Device.findOne({ adaFruitID: deviceID })));
        const nonExistingDevices = devices.filter((device) => !device);
        if (nonExistingDevices.length > 0) {
            nonExistingDevices.forEach(async (device, index) => {
                const newNotification = new Notification({
                    context: `Lỗi khi thêm thiết bị: thiết bị với mã ${deviceIDs[index]} không tồn tại !`,
                    notificationType: 'error',
                    email: user?.email,
                    deviceName: 'Hệ thống'
                });
                await newNotification.save();
            });
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Don't have device!" });
        }
        await Promise.all(
            devices.map(async (device) => {
                device.userID = req.body.userID;
                await device.save();
                const newNotification = new Notification({
                    context: `Thêm thiết bị ${device.deviceName} thành công !`,
                    notificationType: 'success',
                    email: user?.email,
                    deviceName: device.deviceName
                });
                await newNotification.save();
            })
        );

        return res.status(StatusCodes.OK).json({ message: 'success', deviceIDs });
    } catch (error) {
        const user = await User.findById(req.body.userID);
        const newNotification = new Notification({
            context: `Lỗi khi thêm thiết bị: ${error}`,
            notificationType: 'error',
            email: user?.email,
            deviceName: 'Hệ thống'
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
        let device = await Device.findOne({ adaFruitID });
        if (!device) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Don't have device!" });
        if (device.environmentValue[device.environmentValue.length - 1].controlType === 'limit') {
            const user = await User.findById(device.userID);
            const newNotification = new Notification({
                context: `Không thể điều khiển thiết bị ${device.deviceName} do đã vượt quá giới hạn!`,
                notificationType: 'error',
                email: user?.email,
                deviceName: device.deviceName
            });
            await newNotification.save();

            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Can't control device!" });
        }
        const update = {
            $set: {
                deviceState: req.body.deviceState,
                lastValue: req.body.lastValue,
                updatedTime: req.body.updatedTime.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })
            },
            $push: {
                environmentValue: {
                    controlType: 'manual'
                }
            }
        };

        device = await Device.findOneAndUpdate(
            { adaFruitID: adaFruitID },
            {
                ...update
            },
            {
                new: true
            }
        );
        if (req.body.lastValue === 1 && device?.deviceType === 'led') {
            mqttController.UpdateDeviceColor('color', device?.color);
        }
        mqttController.UpdateDeviceInfo(adaFruitID, req.body);
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
        if (req.body.color && device.color !== req.body.color) {
            device.color = req.body.color;
            mqttController.UpdateDeviceColor('color', device?.color);
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
        return res.status(StatusCodes.OK).json({ message: 'success', device });
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
