import { AppNavigationBar } from '@fe/components';
import { dashboardService } from '@fe/services';
import { Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { WiHumidity } from 'react-icons/wi';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { FaRegLightbulb } from 'react-icons/fa';
import 'react-circular-progressbar/dist/styles.css';

export function DashboardPage() {
    const [data, setData] = useState<adaFruitDataList>([]);
    useEffect(() => {
        const fetchDashboard = async () => {
            const data = await dashboardService.getDashboard();
            setData(data);
        };

        // Call immediately
        fetchDashboard();

        // Then call every 3 seconds
        const interval = setInterval(() => {
            fetchDashboard();
        }, 3000); // Interval of 3 seconds

        return () => clearInterval(interval); // Clear the interval if the component unmounts
    }, []);
    return (
        <>
            <AppNavigationBar title={'Dashboard'} />
            <div className='p-4 bg-white/2 dark:text-white/2 dark:bg-gray-700'>
                <div className='h-screen w-full flex'>
                    <div className='flex flex-col gap-4'>
                        <div className='w-[250px] h-[200px] rounded-2xl bg-blue-200 text-white flex justify-center flex-col items-center py-4 '>
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
                        <div className='w-[250px] h-[200px] rounded-2xl bg-brown-500 text-white flex justify-center flex-col items-center py-4 '>
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
                        <div className='w-[250px] h-[200px] rounded-2xl bg-yellow-700 text-white flex justify-center flex-col items-center py-4 '>
                            <div className='flex items-center'>
                                <Typography className='text-lg font-semibold' placeholder={undefined}>
                                    Ánh sáng
                                </Typography>
                                <FaRegLightbulb className='text-4xl' />
                            </div>
                            <CircularProgressbar
                                value={data && (data[7]?.last_value / 500) * 100}
                                text={`${data && data[7]?.last_value} lux`}
                                styles={buildStyles({
                                    textColor: 'white',
                                    pathColor: 'white'
                                })}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
