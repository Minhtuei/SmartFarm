import { Device } from '@be/models';
import { mqttController } from '@be/controllers';
export const limitHandler = async (device: DeviceSchema) => {
    if (device.deviceType === 'light') {
        if (device.environmentValue[device.environmentValue.length - 1].value < device.minLimit) {
            const led = await Device.findOne({ deviceType: 'led', userID: device.userID });
            if (led && led.deviceState === 'OFF') {
                await mqttController.UpdateDeviceInfo(led.adaFruitID, { lastValue: 1 });
            }
        } else if (device.environmentValue[device.environmentValue.length - 1].value > device.maxLimit) {
            const led = await Device.findOne({ deviceType: 'led', userID: device.userID });
            if (led && led.deviceState === 'ON') {
                await mqttController.UpdateDeviceInfo(led.adaFruitID, { lastValue: 0 });
            }
        }
    } else if (device.deviceType === 'earthhumidity') {
        if (device.environmentValue[device.environmentValue.length - 1].value < device.minLimit) {
            const waterpump = await Device.findOne({ deviceType: 'waterpump', userID: device.userID });
            if (waterpump && waterpump.deviceState === 'OFF') {
                await mqttController.UpdateDeviceInfo(waterpump.adaFruitID, { lastValue: 1 });
            }
        } else if (device.environmentValue[device.environmentValue.length - 1].value > device.maxLimit) {
            const waterpump = await Device.findOne({ deviceType: 'waterpump', userID: device.userID });
            if (waterpump && waterpump.deviceState === 'ON') {
                await mqttController.UpdateDeviceInfo(waterpump.adaFruitID, { lastValue: 0 });
            }
        }
    }
};
