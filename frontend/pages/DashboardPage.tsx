import { AppNavigationBar } from '@fe/components';
import { dashboardService } from '@fe/services';
import { Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { WiHumidity } from 'react-icons/wi';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { FaRegLightbulb } from 'react-icons/fa';
import { FaTemperatureHigh } from 'react-icons/fa';

import weatherScreen from '@fe/assets/weather-screen.png';
import 'react-circular-progressbar/dist/styles.css';
import moment from 'moment';

export function DashboardPage() {
    const time = moment().format('HH:mm');
    const day = moment().format('DD/MM/YYYY');
    const [data, setData] = useState<adaFruitDataList>([]);
    useEffect(() => {
        const fetchDashboard = async () => {
            const data = await dashboardService.getDashboard();
            setData(data);
        };

        // Call immediately
        fetchDashboard(); // Then call every 3 seconds
        const interval = setInterval(() => {
            fetchDashboard();
        }, 3000); // Interval of 3 seconds

        return () => clearInterval(interval); // Clear the interval if the component unmounts
    }, []);

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
                                            {data && data[0]?.last_value}°C
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
                                        Thời tiết hiện tại ở trang tại là {data && data[0]?.last_value}°C
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
                                value={data && data[1]?.last_value}
                                text={`${data && data[1]?.last_value}%`}
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
                                value={data && data[1]?.last_value}
                                text={`${data && data[1]?.last_value}%`}
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
                                value={data && (data[5]?.last_value / 500) * 100}
                                text={`${data && data[5]?.last_value} lux`}
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
