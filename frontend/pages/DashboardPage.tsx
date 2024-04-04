import { AppNavigationBar } from '@fe/components';
import { Typography } from '@material-tailwind/react';
import { WiHumidity } from 'react-icons/wi';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { FaRegLightbulb } from 'react-icons/fa';
import { FaTemperatureHigh } from 'react-icons/fa';

import weatherScreen from '@fe/assets/weather-screen.png';
import 'react-circular-progressbar/dist/styles.css';
import moment from 'moment';
import { useDevicesStore } from '@fe/states';
export function DashboardPage() {
    const time = moment().format('HH:mm');
    const day = moment().format('DD/MM/YYYY');
    const { deviceInfos } = useDevicesStore();

    return (
        <>
            <AppNavigationBar title={'Dashboard'} />
            <div className='px-8 py-6 bg-white/2 dark:text-white/2 dark:bg-gray-700'>
                <div className='h-screen w-full flex flex-col md:flex-row gap-4 md:justify-between'>
                    <div className='flex flex-col'>
                        <div
                            style={{
                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${weatherScreen})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center'
                            }}
                            className='flex flex-col justify-between lg:w-[480px] lg:h-[200px] xl:w-[680px] xl:h-[250px] rounded-3xl p-4'
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
                                            {deviceInfos.filter((device) => device.deviceType === 'temperature')[0]?.lastValue}
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
                                        Thời tiết hiện tại ở trang tại là {deviceInfos && deviceInfos[0]?.lastValue}°C
                                    </Typography>
                                    <Typography className='text-sm text-white' placeholder={undefined}>
                                        Hãy dành chút thời gian để xem thông tin cảm biến và chăm sóc trang trại của bạn nhé!
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-4'>
                        <div className='h-[300px] md:w-[250px] md:h-[200px] rounded-2xl bg-[#55C3F2] text-white flex justify-center flex-col items-center py-4 '>
                            <div className='flex items-center'>
                                <Typography className='text-lg font-semibold' placeholder={undefined}>
                                    Độ ẩm
                                </Typography>
                                <WiHumidity className='text-6xl' />
                            </div>
                            <CircularProgressbar
                                value={deviceInfos && deviceInfos[1]?.lastValue}
                                text={`${deviceInfos && deviceInfos[1]?.lastValue}%`}
                                styles={buildStyles({
                                    textColor: 'white',
                                    pathColor: 'white'
                                })}
                            />
                        </div>
                        <div className='h-[300px] md:w-[250px] md:h-[200px] rounded-2xl bg-[#BE704F] text-white flex justify-center flex-col items-center py-4 '>
                            <div className='flex items-center'>
                                <Typography className='text-lg font-semibold' placeholder={undefined}>
                                    Độ ẩm đất
                                </Typography>
                                <WiHumidity className='text-6xl' />
                            </div>
                            <CircularProgressbar
                                value={deviceInfos.filter((device) => device.deviceType === 'earthhumidity')[0]?.lastValue}
                                text={`${deviceInfos.filter((device) => device.deviceType === 'earthhumidity')[0]?.lastValue}%`}
                                styles={buildStyles({
                                    textColor: 'white',
                                    pathColor: 'white'
                                })}
                            />
                        </div>
                        <div className='h-[300px] md:w-[250px] md:h-[200px] rounded-2xl bg-[#EA5E5E] text-white flex justify-center flex-col items-center py-4 '>
                            <div className='flex items-center'>
                                <Typography className='text-lg font-semibold' placeholder={undefined}>
                                    Ánh sáng
                                </Typography>
                                <FaRegLightbulb className='text-4xl' />
                            </div>
                            <CircularProgressbar
                                value={deviceInfos && (deviceInfos[5]?.lastValue / 500) * 100}
                                text={`${deviceInfos && deviceInfos[5]?.lastValue} lux`}
                                styles={buildStyles({
                                    textColor: 'white',
                                    pathColor: 'yellow'
                                })}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
