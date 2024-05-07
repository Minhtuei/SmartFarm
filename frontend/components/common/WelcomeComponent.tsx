import weatherScreen from '@fe/assets/weather-screen.png';
import { Typography } from '@material-tailwind/react';
import { FaTemperatureHigh } from 'react-icons/fa';
import moment from 'moment';
import { useDevicesStore } from '@fe/states';
export function WelcomeComponent() {
    const time = moment().format('HH:mm');
    const day = moment().format('DD/MM/YYYY');
    const { deviceInfos } = useDevicesStore();
    return (
        <div
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${weatherScreen})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }}
            className='flex flex-col justify-between w-full lg:h-[200px] xl:h-[250px] rounded-3xl p-4'
        >
            <div className='flex flex-row-reverse'>
                <div className='flex flex-col w-[300px] items-end gap-2'>
                    <div className='flex items-center gap-4'>
                        <Typography className='text-white font-semibold text-lg' placeholder={undefined}>
                            {day}
                        </Typography>
                        <Typography className='text-white font-semibold text-lg' placeholder={undefined}>
                            {time}
                        </Typography>
                    </div>
                    <div className='flex items-center gap-2 '>
                        <Typography className='text-white text-3xl font-semibold' placeholder={undefined}>
                            {deviceInfos.filter((device) => device.deviceType === 'temperature')[0]?.lastValue || 0}°C
                        </Typography>
                        <FaTemperatureHigh className='text-4xl text-white' />
                    </div>
                </div>
            </div>
            <div className='flex'>
                <div className='flex flex-col text-center w-[300px]'>
                    <Typography className='text-lg font-semibold text-white' placeholder={undefined}>
                        Xin chào, Minh Tuệ
                    </Typography>
                    <Typography className='text-sm text-white' placeholder={undefined}>
                        Thời tiết hiện tại ở trang tại là{' '}
                        {deviceInfos.filter((device) => device.deviceType === 'temperature')[0]?.lastValue || 0}°C
                    </Typography>
                    <Typography className='text-sm text-white' placeholder={undefined}>
                        Hãy dành chút thời gian để xem thông tin cảm biến và chăm sóc trang trại của bạn nhé!
                    </Typography>
                </div>
            </div>
        </div>
    );
}
