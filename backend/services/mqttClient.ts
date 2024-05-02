import mqtt from 'mqtt';
import { envs } from '@be/configs';
import { Device, User } from '@be/models';
import NotificationFactory from './NotificationFactory';

class MQTTClient {
    private client: mqtt.MqttClient;

    private constructor() {
        const url = `mqtt://${envs.ADAFRUIT_IO_USERNAME}:${envs.ADAFRUIT_IO_KEY}@io.adafruit.com`;
        this.client = mqtt.connect(url);
        this.onConnect();
    }

    static instance: MQTTClient;

    static getInstance() {
        if (!MQTTClient.instance) {
            MQTTClient.instance = new MQTTClient();
        }
        return MQTTClient.instance;
    }

    private onConnect() {
        this.client.on('connect', () => {
            console.log('Connected to MQTT broker');
        });
    }

    onMessage(callback: (topic: string, message: string) => void) {
        this.client.on('message', (topic, message) => {
            callback(topic, message.toString());
        });
    }

    subscribe(topic: string) {
        this.client.subscribe(`${envs.ADAFRUIT_IO_USERNAME}/feeds/${topic}`, (err) => {
            if (err) {
                console.error('Failed to subscribe to topic', topic);
            } else {
                console.log('Subscribed to topic', topic);
            }
        });
    }

    publish(topic: string, message: string) {
        this.client.publish(`${envs.ADAFRUIT_IO_USERNAME}/feeds/${topic}`, message, async (err) => {
            const device = await Device.findOne({ adaFruitID: topic });
            const user = await User.findOne({ _id: device?.userID });
            if (err) {
                console.error('Failed to publish message to topic', topic);
                await NotificationFactory.createErrorNotification({
                    context: 'Đã xảy ra lỗi khi điều khiển thiết bị',
                    email: user?.email,
                    deviceName: device?.deviceName
                });
            } else {
                console.log('Published message to topic', topic);
                const state = message === '1' ? 'bật' : 'tắt';
                await NotificationFactory.createSuccessNotification({
                    context: `Thiết bị ${device?.deviceName} đã được ${state}`,
                    email: user?.email,
                    deviceName: device?.deviceName
                });
            }
        });
    }

    publishColor(topic: string, message: string) {
        this.client.publish(`${envs.ADAFRUIT_IO_USERNAME}/feeds/${topic}`, message, async (err) => {
            if (err) {
                console.error('Failed to publish message to topic', topic);
            } else {
                console.log('Published message to topic', topic);
            }
        });
    }

    publishSpeechRecognition(topic: string, message: string) {
        this.client.publish(`${envs.ADAFRUIT_IO_USERNAME}/feeds/${topic}`, message, async (err) => {
            if (err) {
                console.error('Failed to publish message to topic', topic);
            } else {
                console.log('Published message to topic', topic);
            }
        });
    }
}

const mqttClient = MQTTClient.getInstance();

export { mqttClient };
