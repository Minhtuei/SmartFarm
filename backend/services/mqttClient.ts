import mqtt from 'mqtt';
import { envs } from '@be/configs';
const url = `mqtt://${envs.ADAFRUIT_IO_USERNAME}:${envs.ADAFRUIT_IO_KEY}@io.adafruit.com`;
const client = mqtt.connect(url);
import { Notification, Device, User } from '@be/models';
const onConnect = () => {
    client.on('connect', () => {
        console.log('Connected to MQTT broker');
    });
};
const onMessage = (callback: (topic: string, message: string) => void) => {
    client.on('message', (topic, message) => {
        callback(topic, message.toString());
    });
};
const subscribe = (topic: string) => {
    client.subscribe(`${envs.ADAFRUIT_IO_USERNAME}/feeds/${topic}`, (err) => {
        if (err) {
            console.error('Failed to subscribe to topic', topic);
        } else {
            console.log('Subscribed to topic', topic);
        }
    });
};
const publish = (topic: string, message: string) => {
    client.publish(`${envs.ADAFRUIT_IO_USERNAME}/feeds/${topic}`, message, async (err) => {
        const device = await Device.findOne({ adaFruitID: topic });
        const user = await User.findOne({ _id: device?.userID });
        if (err) {
            console.error('Failed to publish message to topic', topic);
            const notification = new Notification({
                context: `Thiết bị ${device?.deviceName} không thể cập nhật trạng thái`,
                notificationType: 'error',
                email: user?.email,
                deviceName: device?.deviceName
            });
            await notification.save();
        } else {
            console.log('Published message to topic', topic);
            const user = await User.findOne({ _id: device?.userID });
            const state = message === '1' ? 'bật' : 'tắt';
            const notification = new Notification({
                context: `Thiết bị ${device?.deviceName} đã được ${state}`,
                notificationType: 'success',
                email: user?.email,
                deviceName: device?.deviceName
            });
            await notification.save();
        }
    });
};
const publishColor = (topic: string, message: string) => {
    client.publish(`${envs.ADAFRUIT_IO_USERNAME}/feeds/${topic}`, message, async (err) => {
        if (err) {
            console.error('Failed to publish message to topic', topic);
        } else {
            console.log('Published message to topic', topic);
        }
    });
};
export const mqttClient = {
    client,
    onConnect,
    onMessage,
    subscribe,
    publish,
    publishColor
};
