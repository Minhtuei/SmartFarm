import { Device } from '@be/models';
import { mqttController } from '@be/controllers';
import { Notification, User } from '@be/models';
const toTimeStamps = (time: string) => {
    const [hours, minutes] = time.split(':');
    return parseInt(hours) * 60 + parseInt(minutes);
};
export const Scheduler = async () => {
    try {
        const devices = await Device.find({ deviceType: { $in: ['led', 'waterpump'] } });
        devices.forEach(async (device) => {
            if (device.schedule.length !== 0) {
                const currentTime = toTimeStamps(
                    new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'Asia/Bangkok', hour: '2-digit', minute: '2-digit' })
                );
                device.schedule.forEach(async (schedule: Scheduler) => {
                    if (currentTime === toTimeStamps(schedule.startTime) && device.deviceState === 'OFF') {
                        const user = await User.findOne({ _id: device?.userID });
                        const notification = new Notification({
                            context: `Thiết bị ${device?.deviceName} sẽ được bật theo lịch từ ${schedule.startTime} đến ${schedule.endTime}`,
                            notificationType: 'schedule',
                            email: user?.email,
                            deviceName: device?.deviceName
                        });
                        await notification.save();
                        await mqttController.UpdateDeviceInfo(device.adaFruitID, { lastValue: 1 });
                    } else if (currentTime === toTimeStamps(schedule.endTime) && device.deviceState === 'ON') {
                        const user = await User.findOne({ _id: device?.userID });
                        const notification = new Notification({
                            context: `Thiết bị ${device?.deviceName} sẽ được tắt theo lịch từ ${schedule.startTime} đến ${schedule.endTime}`,
                            notificationType: 'schedule',
                            email: user?.email,
                            deviceName: device?.deviceName
                        });
                        await notification.save();
                        await mqttController.UpdateDeviceInfo(device.adaFruitID, { lastValue: 0 });
                    }
                });
            }
        });
    } catch (err) {
        console.error('Error in Scheduler: ', err);
    }
};
