import { Device } from '@be/models';
import { mqttController } from '@be/controllers';
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
                        await mqttController.UpdateDeviceInfo(device.adaFruitID, { lastValue: 1 });
                    } else if (currentTime === toTimeStamps(schedule.endTime) && device.deviceState === 'ON') {
                        await mqttController.UpdateDeviceInfo(device.adaFruitID, { lastValue: 0 });
                    }
                });
            }
        });
    } catch (err) {
        console.error('Error in Scheduler: ', err);
    }
};
