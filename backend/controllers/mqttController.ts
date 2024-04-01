import { mqttClient } from '@be/services';
import { Device } from '@be/models';
import path from 'path';
import fs from 'fs';
const GetDeViceInfo = mqttClient.onMessage(async (topic, message) => {
    const regex = /\/feeds\/(\d+)\/json/;
    if (regex.test(topic)) {
        try {
            const jsonMessage = JSON.parse(message);
            const adaFruitID = jsonMessage.id;
            const device = await Device.findOne({ adaFruitID });
            if (device && device.deviceState !== 'OFF') {
                device.lastValue = jsonMessage.last_value;
                device.updatedTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' });
                device.environmentValue.push({
                    value: jsonMessage.data.value,
                    createdTime: new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })
                });
                device.save();
            } else {
                const newDevice = new Device({
                    adaFruitID: jsonMessage.id,
                    deviceName: jsonMessage.key,
                    deviceType: jsonMessage.key.split('-')[0],
                    deviceState: jsonMessage.key.split('-')[0] === 'led' || jsonMessage.key.split('_')[0] === 'waterpump' ? 'ON' : 'NONE',
                    lastValue: parseInt(jsonMessage.last_value),
                    updatedTime: new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }),
                    environmentValue: {
                        value: jsonMessage.data.value,
                        createdTime: new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })
                    }
                });
                newDevice.save();
            }
            const dataPath = path.join(__dirname, 'data.json');
            fs.writeFileSync(dataPath, JSON.stringify(device), 'utf8');
        } catch (err) {
            console.error('Error parsing message from Adafruit: ', err);
        }
    }
});
export const mqttController = {
    GetDeViceInfo
};
