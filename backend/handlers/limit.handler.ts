import { Device } from '@be/models';
import { mqttController } from '@be/controllers';
import { User } from '@be/models';
import { SendNotification } from '../controllers/emailController';
import NotificationFactory from '../services/NotificationFactory';
export const limitHandler = async (device: DeviceSchema) => {
    if (device.deviceType === 'light') {
        const led = await Device.findOne({ deviceType: 'led', userID: device.userID });
        if (device.environmentValue[device.environmentValue.length - 1].value < device.minLimit) {
            if (led && led.deviceState === 'OFF') {
                mqttController.UpdateDeviceInfo(led.adaFruitID, { lastValue: 1 });
                mqttController.UpdateDeviceColor('color', led.color);
                led.environmentValue.push({
                    controlType: 'limit'
                });
                const user = await User.findOne({ _id: device.userID });
                await NotificationFactory.createWarningNotification({
                    context: 'Ánh sáng dưới mức cho phép, hệ thống sẽ bật đèn',
                    email: user?.email,
                    deviceName: 'Hệ thống'
                });
                await led.save();
                if (user?.email) {
                    await SendNotification(
                        user.email,
                        device.deviceName,
                        `
                    Thiết bị ${device.deviceName} ghi nhận giá trị ${
                        device.environmentValue[device.environmentValue.length - 1].value
                    } lux (dưới mức cho phép).
                    Vì thế, hệ thống đã bật đèn để cung cấp ánh sáng cho cây trồng.
                    Lưu ý: Người dùng không thể tắt đèn cho tới khi ${device.deviceName} ghi nhận giá trị ổn định.
                `
                    );
                }
            }
        } else if (device.environmentValue[device.environmentValue.length - 1].value > device.maxLimit) {
            if (led && led.deviceState === 'ON') {
                mqttController.UpdateDeviceInfo(led.adaFruitID, { lastValue: 0 });
                led.environmentValue.push({
                    controlType: 'limit'
                });
                const user = await User.findOne({ _id: device.userID });
                await NotificationFactory.createWarningNotification({
                    context: 'Ánh sáng vượt mức cho phép, hệ thống sẽ tắt đèn',
                    email: user?.email,
                    deviceName: 'Hệ thống'
                });
                await led.save();
                if (user?.email) {
                    await SendNotification(
                        user.email,
                        device.deviceName,
                        `
                    Thiết bị ${device.deviceName} ghi nhận giá trị ${
                        device.environmentValue[device.environmentValue.length - 1].value
                    } lux (vượt mức cho phép).
                    Vì thế, hệ thống đã tắt đèn để tránh tác động đến cây trồng.
                    Lưu ý: Người dùng không thể bật đèn cho tới khi ${device.deviceName} ghi nhận giá trị ổn định.
                `
                    );
                }
            }
        } else {
            if (led && led.deviceState === 'ON' && led.environmentValue[led.environmentValue.length - 1].controlType === 'limit') {
                mqttController.UpdateDeviceInfo(led.adaFruitID, { lastValue: 0 });
                led.environmentValue.push({
                    controlType: 'manual'
                });
                const user = await User.findOne({ _id: device.userID });
                await NotificationFactory.createWarningNotification({
                    context: 'Ánh sáng đã ổn định, hệ thống sẽ tắt đèn',
                    email: user?.email,
                    deviceName: 'Hệ thống'
                });
                await led.save();
                if (user?.email) {
                    await SendNotification(
                        user.email,
                        device.deviceName,
                        `
                    Thiết bị ${device.deviceName} ghi nhận giá trị ${
                        device.environmentValue[device.environmentValue.length - 1].value
                    } ổn định.
                    Vì thế, hệ thống đã tắt đèn để tránh tác động đến cây trồng.
                    Lưu ý: Người dùng đã có thể bật đèn khi cần thiết.
                `
                    );
                }
            } else if (led && led.deviceState === 'OFF' && led.environmentValue[led.environmentValue.length - 1].controlType === 'limit') {
                mqttController.UpdateDeviceInfo(led.adaFruitID, { lastValue: 1 });
                mqttController.UpdateDeviceColor('color', led.color);
                led.environmentValue.push({
                    controlType: 'manual'
                });
                const user = await User.findOne({ _id: device.userID });
                await NotificationFactory.createWarningNotification({
                    context: 'Ánh sáng đã ổn định, hệ thống sẽ bật đèn',
                    email: user?.email,
                    deviceName: 'Hệ thống'
                });
                await led.save();
                if (user?.email) {
                    await SendNotification(
                        user.email,
                        device.deviceName,
                        `
                    Thiết bị ${device.deviceName} ghi nhận giá trị ${
                        device.environmentValue[device.environmentValue.length - 1].value
                    } lux (ổn định).
                    Vì thế, hệ thống đã bật đèn để cung cấp ánh sáng cho cây trồng.
                    Lưu ý: Người dùng đã có thể tắt đèn khi cần thiết.
                `
                    );
                }
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
                await NotificationFactory.createWarningNotification({
                    context: 'Độ ẩm đất dưới mức cho phép, hệ thống sẽ bật máy tưới',
                    email: user?.email,
                    deviceName: 'Hệ thống'
                });
                await waterpump.save();
                if (user?.email) {
                    await SendNotification(
                        user.email,
                        device.deviceName,
                        `
                    Thiết bị ${device.deviceName} ghi nhận giá trị ${
                        device.environmentValue[device.environmentValue.length - 1].value
                    }% (dưới mức cho phép).
                    Vì thế, hệ thống đã bật máy tưới để cung cấp nước cho cây trồng.
                    Lưu ý: Người dùng không thể tắt máy tưới cho tới khi ${device.deviceName} ghi nhận giá trị ổn định.
                `
                    );
                }
            }
        } else if (device.environmentValue[device.environmentValue.length - 1].value > device.maxLimit) {
            const waterpump = await Device.findOne({ deviceType: 'waterpump', userID: device.userID });
            if (waterpump && waterpump.deviceState === 'ON') {
                mqttController.UpdateDeviceInfo(waterpump.adaFruitID, { lastValue: 0 });
                waterpump.environmentValue.push({
                    controlType: 'limit'
                });
                const user = await User.findOne({ _id: device.userID });
                await NotificationFactory.createWarningNotification({
                    context: 'Độ ẩm đất vượt mức cho phép, hệ thống sẽ tắt máy tưới',
                    email: user?.email,
                    deviceName: 'Hệ thống'
                });
                await waterpump.save();
                if (user?.email) {
                    await SendNotification(
                        user.email,
                        device.deviceName,
                        `
                    Thiết bị ${device.deviceName} ghi nhận giá trị ${
                        device.environmentValue[device.environmentValue.length - 1].value
                    }% (vượt mức cho phép).
                    Vì thế, hệ thống đã tắt máy tưới để tránh tác động đến cây trồng.
                    Lưu ý: Người dùng không thể bật máy tưới cho tới khi ${device.deviceName} ghi nhận giá trị ổn định.
                `
                    );
                }
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
                await NotificationFactory.createWarningNotification({
                    context: 'Độ ẩm đất đã ổn định, hệ thống sẽ tắt máy tưới',
                    email: user?.email,
                    deviceName: 'Hệ thống'
                });
                await waterpump.save();
                if (user?.email) {
                    await SendNotification(
                        user.email,
                        device.deviceName,
                        `
                    Thiết bị ${device.deviceName} ghi nhận giá trị ${
                        device.environmentValue[device.environmentValue.length - 1].value
                    }% (ổn định).
                    Vì thế, hệ thống đã tắt máy tưới để tránh tác động đến cây trồng.
                    Lưu ý: Người dùng đã có thể bật máy tưới khi cần thiết.
                `
                    );
                }
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
                await NotificationFactory.createWarningNotification({
                    context: 'Độ ẩm đất đã ổn định, hệ thống sẽ bật máy tưới',
                    email: user?.email,
                    deviceName: 'Hệ thống'
                });
                await waterpump.save();
                if (user?.email) {
                    await SendNotification(
                        user.email,
                        device.deviceName,
                        `
                    Thiết bị ${device.deviceName} ghi nhận giá trị ${
                        device.environmentValue[device.environmentValue.length - 1].value
                    }% (ổn định).
                    Vì thế, hệ thống đã bật máy tưới để cung cấp nước cho cây trồng.
                    Lưu ý: Người dùng đã có thể tắt máy tưới khi cần thiết.
                `
                    );
                }
            }
        }
    }
};
