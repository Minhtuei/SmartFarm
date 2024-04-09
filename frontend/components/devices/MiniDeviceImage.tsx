import LightSensor from '@fe/assets/light-sensor.png';
import TemperatureSensor from '@fe/assets/temperature-sensor.jpg';
import HumiditySensor from '@fe/assets/humidity-sensor.jpg';
import LedSensor from '@fe/assets/led-sensor.jpg';
import PumpSensor from '@fe/assets/pump-sensor.jpg';
export function mapImage(deviceType: string) {
    switch (deviceType) {
        case 'light':
            return LightSensor;
        case 'temperature':
            return TemperatureSensor;
        case 'earthhumidity':
        case 'airhumidity':
            return HumiditySensor;
        case 'led':
            return LedSensor;
        case 'waterpump':
            return PumpSensor;
        default:
            return '';
    }
}
export function MiniDeviceImage({ deviceType }: { deviceType: string }) {
    return <img src={mapImage(deviceType)} alt='device' className='w-full h-full object-cover' />;
}
