import AirHumidityImg from '@fe/assets/air-humidity.jpg';
import LightImg from '@fe/assets/light.jpg';
import EarthHumidityImg from '@fe/assets/soil-moisture.jpg';
import TemperatureImg from '@fe/assets/temperature.jpg';
import { WiHumidity, WiLightning, WiThermometer } from 'react-icons/wi';
export const DEVICE_CATEGORY: Record<string, DeviceCategory> = {
    earthhumidity: {
        longName: 'Cảm biến độ ẩm đất',
        shortName: 'Độ ẩm đất',
        image: EarthHumidityImg,
        icon: <WiHumidity className='text-6xl' />,
        lineChartName: 'Biểu đồ độ ẩm đất',
        unit: '%'
    },
    airhumidity: {
        longName: 'Cảm biến độ ẩm không khí',
        shortName: 'Độ ẩm',
        image: AirHumidityImg,
        icon: <WiHumidity className='text-6xl' />,
        lineChartName: 'Biểu đồ độ ẩm không khí',
        unit: '%'
    },
    temperature: {
        longName: 'Cảm biến nhiệt độ',
        shortName: 'Nhiệt độ',
        image: TemperatureImg,
        icon: <WiThermometer className='text-6xl' />,
        lineChartName: 'Biểu đồ nhiệt độ',
        unit: '°C'
    },
    light: {
        longName: 'Cảm biến ánh sáng',
        shortName: 'Ánh sáng',
        image: LightImg,
        icon: <WiLightning className='text-6xl' />,
        lineChartName: 'Biểu đồ ánh sáng',
        unit: 'lux'
    }
};
