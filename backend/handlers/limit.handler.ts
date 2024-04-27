import { Device } from '@be/models';
import { mqttController } from '@be/controllers';
import { Notification, User } from '@be/models';

export const limitHandler = async (device: DeviceSchema) => {
    if (device.deviceType === 'light') {
        const led = await Device.findOne({ deviceType: 'led', userID: device.userID });
        if (device.environmentValue[device.environmentValue.length - 1].value < device.minLimit) {
            if (led && led.deviceState === 'OFF') {
                mqttController.UpdateDeviceInfo(led.adaFruitID, { lastValue: 1 });
                mqttController.UpdateDeviceColor(led.adaFruitID, device.color);
                led.environmentValue.push({
                    controlType: 'limit'
                });
                const user = await User.findOne({ _id: device.userID });
                const notification = new Notification({
                    context: 'Ánh sáng dưới mức cho phép, hệ thống sẽ bật đèn',
                    deviceName: 'Hệ thống',
                    notificationType: 'warning',
                    email: user?.email
                });
                await notification.save();
                await led.save();
            }
        } else if (device.environmentValue[device.environmentValue.length - 1].value > device.maxLimit) {
            if (led && led.deviceState === 'ON') {
                mqttController.UpdateDeviceInfo(led.adaFruitID, { lastValue: 0 });
                led.environmentValue.push({
                    controlType: 'limit'
                });
                const user = await User.findOne({ _id: device.userID });
                const notification = new Notification({
                    context: 'Ánh sáng vượt mức cho phép, hệ thống sẽ tắt đèn',
                    deviceName: 'Hệ thống',
                    notificationType: 'warning',
                    email: user?.email
                });
                await notification.save();
                await led.save();
            }
        } else {
            if (led && led.deviceState === 'ON' && led.environmentValue[led.environmentValue.length - 1].controlType === 'limit') {
                mqttController.UpdateDeviceInfo(led.adaFruitID, { lastValue: 0 });
                led.environmentValue.push({
                    controlType: 'manual'
                });
                const user = await User.findOne({ _id: device.userID });
                const notification = new Notification({
                    context: 'Ánh sáng đã ổn định, hệ thống sẽ tắt đèn',
                    deviceName: 'Hệ thống',
                    notificationType: 'warning',
                    email: user?.email
                });
                await notification.save();
                await led.save();
            } else if (led && led.deviceState === 'OFF' && led.environmentValue[led.environmentValue.length - 1].controlType === 'limit') {
                mqttController.UpdateDeviceInfo(led.adaFruitID, { lastValue: 1 });
                mqttController.UpdateDeviceColor(led.adaFruitID, device.color);
                led.environmentValue.push({
                    controlType: 'manual'
                });
                const user = await User.findOne({ _id: device.userID });
                const notification = new Notification({
                    context: 'Ánh sáng đã ổn định, hệ thống sẽ bật đèn',
                    deviceName: 'Hệ thống',
                    notificationType: 'warning',
                    email: user?.email
                });
                await notification.save();
                await led.save();
            }
        }
    } else if (device.deviceType === 'earthhumidity') {
        const waterpump = await Device.findOne({ deviceType: 'waterpump', userID: device.userID });
        if (device.environmentValue[device.environmentValue.length - 1].value < device.minLimit) {
            if (waterpump && waterpump.deviceState === 'OFF') {
                mqttController.UpdateDeviceInfo(waterpump.adaFruitID, { lastValue: 1 });
                waterpump.environmentValue.push({
                    controlType: 'limit'
                });
                const user = await User.findOne({ _id: device.userID });
                const notification = new Notification({
                    context: 'Độ ẩm đất dưới mức cho phép, hệ thống sẽ bật máy tưới',
                    deviceName: 'Hệ thống',
                    notificationType: 'warning',
                    email: user?.email
                });
                await notification.save();
                await waterpump.save();
            }
        } else if (device.environmentValue[device.environmentValue.length - 1].value > device.maxLimit) {
            const waterpump = await Device.findOne({ deviceType: 'waterpump', userID: device.userID });
            if (waterpump && waterpump.deviceState === 'ON') {
                mqttController.UpdateDeviceInfo(waterpump.adaFruitID, { lastValue: 0 });
                waterpump.environmentValue.push({
                    controlType: 'limit'
                });
                const user = await User.findOne({ _id: device.userID });
                const notification = new Notification({
                    context: 'Độ ẩm đất vượt mức cho phép, hệ thống sẽ tắt máy tưới',
                    deviceName: 'Hệ thống',
                    notificationType: 'warning',
                    email: user?.email
                });
                await notification.save();
                await waterpump.save();
            }
        } else {
            if (
                waterpump &&
                waterpump.deviceState === 'ON' &&
                waterpump.environmentValue[waterpump.environmentValue.length - 1].controlType === 'limit'
            ) {
                mqttController.UpdateDeviceInfo(waterpump.adaFruitID, { lastValue: 0 });
                waterpump.environmentValue.push({
                    controlType: 'manual'
                });
                const user = await User.findOne({ _id: device.userID });
                const notification = new Notification({
                    context: 'Độ ẩm đất đã ổn định, hệ thống sẽ tắt máy tưới',
                    deviceName: 'Hệ thống',
                    notificationType: 'warning',
                    email: user?.email
                });
                await notification.save();
                await waterpump.save();
            } else if (
                waterpump &&
                waterpump.deviceState === 'OFF' &&
                waterpump.environmentValue[waterpump.environmentValue.length - 1].controlType === 'limit'
            ) {
                mqttController.UpdateDeviceInfo(waterpump.adaFruitID, { lastValue: 1 });
                waterpump.environmentValue.push({
                    controlType: 'manual'
                });
                const user = await User.findOne({ _id: device.userID });
                const notification = new Notification({
                    context: 'Độ ẩm đất đã ổn định, hệ thống sẽ bật máy tưới',
                    deviceName: 'Hệ thống',
                    notificationType: 'warning',
                    email: user?.email
                });
                await notification.save();
                await waterpump.save();
            }
        }
    }
};
