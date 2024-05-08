import { Device } from '@be/models';
import { mqttController } from '@be/controllers';
import NotificationFactory from '../services/NotificationFactory';
import { User } from '@be/models';
import moment from 'moment';
export const Scheduler = async () => {
    try {
        const devices = await Device.find({ deviceType: { $in: ['led', 'waterpump'] } });
        devices.forEach(async (device) => {
            if (device.schedule.length !== 0) {
                const currentTime = moment().unix();
                const startTime = moment(device.schedule[0].startTime, 'HH:mm:ss').unix();
                const endTime = moment(device.schedule[0].endTime, 'HH:mm:ss').unix();
                device.schedule.forEach(async (schedule: Scheduler) => {
                    if (Math.abs(startTime - currentTime) <= 3 && device.deviceState === 'OFF') {
                        const user = await User.findOne({ _id: device?.userID });
                        if (device.environmentValue[device.environmentValue.length - 1].controlType === 'limit') {
                            await NotificationFactory.createWarningNotification({
                                context: `Thiết bị ${device?.deviceName} không thể bật theo lịch do đã vượt quá giới hạn`,
                                email: user?.email,
                                deviceName: 'Hệ thống'
                            });
                        } else {
                            await NotificationFactory.createInfoNotification({
                                context: `Thiết bị ${device?.deviceName} sẽ được bật theo lịch từ ${schedule.startTime} đến ${schedule.endTime}`,
                                email: user?.email,
                                deviceName: 'Hệ thống'
                            });
                            device.environmentValue.push({
                                controlType: 'schedule'
                            });
                            await device.save();
                            mqttController.UpdateDeviceInfo(device.adaFruitID, { lastValue: 1 });
                            if (device.deviceType === 'led') {
                                mqttController.UpdateDeviceColor('color', device.color);
                            }
                        }
                    } else if (
                        Math.abs(endTime - currentTime) <= 3 &&
                        device.deviceState === 'ON' &&
                        device.environmentValue[device.environmentValue.length - 1].controlType === 'schedule'
                    ) {
                        const user = await User.findOne({ _id: device?.userID });
                        await NotificationFactory.createInfoNotification({
                            context: `Thiết bị ${device?.deviceName} sẽ được tắt theo lịch từ ${schedule.startTime} đến ${schedule.endTime}`,
                            email: user?.email,
                            deviceName: 'Hệ thống'
                        });
                        device.environmentValue.push({
                            controlType: 'schedule'
                        });
                        await device.save();
                        mqttController.UpdateDeviceInfo(device.adaFruitID, { lastValue: 0 });
                    }
                });
            }
        });
    } catch (err) {
        console.error('Error in Scheduler: ', err);
    }
};
