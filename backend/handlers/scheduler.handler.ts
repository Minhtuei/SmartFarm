import { Device } from '@be/models';
import { mqttController } from '@be/controllers';
import NotificationFactory from '../services/NotificationFactory';
import { User } from '@be/models';
export const Scheduler = async () => {
    try {
        const devices = await Device.find({ deviceType: { $in: ['led', 'waterpump'] } });
        devices.forEach(async (device) => {
            if (device.schedule.length !== 0) {
                const currentTime = new Date().toLocaleTimeString('en-US', {
                    hour12: false,
                    timeZone: 'Asia/Bangkok',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });
                device.schedule.forEach(async (schedule: Scheduler) => {
                    if (currentTime === schedule.startTime.padEnd(8, ':00') && device.deviceState === 'OFF') {
                        const user = await User.findOne({ _id: device?.userID });
                        if (device.environmentValue[device.environmentValue.length - 1].controlType === 'limit') {
                            await NotificationFactory.createWarningNotification({
                                context: `Thiết bị ${device?.deviceName} không thể bật theo lịch do đã vượt quá giới hạn`,
                                email: user?.email,
                                deviceName: 'Hệ thống'
                            });
                        } else {
                            await NotificationFactory.createSuccessNotification({
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
                        currentTime === schedule.endTime.padEnd(8, ':00') &&
                        device.deviceState === 'ON' &&
                        device.environmentValue[device.environmentValue.length - 1].controlType === 'schedule'
                    ) {
                        const user = await User.findOne({ _id: device?.userID });
                        await NotificationFactory.createSuccessNotification({
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
