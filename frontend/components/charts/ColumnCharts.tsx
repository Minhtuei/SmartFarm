import { DeviceService } from '@fe/services';
import { useState, useEffect, useMemo } from 'react';
import { useUserInfoStore } from '@fe/states';
import moment from 'moment';
import Chart from 'react-apexcharts';
import _ from 'lodash';
import { Carousel, IconButton } from '@material-tailwind/react';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import { useScreenSize } from '@fe/hooks';
import { useResponsiveStore } from '@fe/states';
interface EnvironmentValue {
    id: number;
    value: number;
    createdTime: string;
}

export function ColumnChart({ type, deviceInfos }: { type: string; deviceInfos: DeviceData[] }) {
    const screen = useScreenSize();
    const { darkMode } = useResponsiveStore();
    useEffect(() => {
        document.querySelectorAll('.apexcharts-tooltip').forEach((tooltip) => {
            tooltip.classList.add('bg-white', 'dark:bg-black', 'shadow-lg', 'dark:shadow-none');
        });
    }, [darkMode]);
    const infoByDate = useMemo(() => {
        return _.chain(deviceInfos)
            .filter((device: DeviceData) => device.deviceType === type)
            .flatMap((device: DeviceData) => device.environmentValue)
            .groupBy((envValue: EnvironmentValue) => moment(envValue.createdTime, 'M/D/YYYY, h:mm:ss A').format('DD/MM/YYYY'))
            .map((values: EnvironmentValue[], date: string) => ({
                x: date,
                y: +_.meanBy(values, 'value').toFixed(2)
            }))
            .value(); // Convert lodash chain to array
    }, [deviceInfos, type]);

    const options = useMemo(
        () => ({
            series: [
                {
                    name: type === 'temperature' ? 'Nhiệt độ (°C)' : type === 'airhumidity' ? 'Độ ẩm không khí (%)' : 'Ánh sáng (lux)',
                    data: infoByDate.map((info) => ({
                        x: info.x,
                        y: info.y
                    }))
                }
            ],
            chart: {
                type: 'bar',
                height: 350
            },
            xaxis: {
                categories: infoByDate.map((info) => info.x),
                labels: {
                    style: {
                        fontSize: screen.screenSize >= 2 ? '14px' : '10px',
                        fontWeight: 'bold'
                    }
                }
            },
            title: {
                text: `Biểu đồ ${type === 'temperature' ? 'nhiệt độ' : type === 'airhumidity' ? 'độ ẩm không khí' : 'ánh sáng'} theo ngày`,
                align: 'center',
                style: {
                    fontSize: screen.screenSize >= 2 ? '20px' : '14px',
                    fontWeight: 'bold'
                }
            },
            dataLabels: {
                enabled: true,
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold'
                }
            },
            plotOptions: {
                bar: {
                    distributed: true
                }
            },
            grid: {
                borderColor: darkMode ? '#333' : '#e8e8e8'
            },
            tooltip: {
                theme: darkMode ? 'dark' : 'light'
            },
            yaxis: {
                title: {
                    text: type === 'temperature' ? 'Nhiệt độ (°C)' : type === 'airhumidity' ? 'Độ ẩm không khí (%)' : 'Ánh sáng (lux)',
                    style: {
                        fontSize: '14px',
                        fontWeight: 'bold'
                    }
                }
            }
        }),
        [infoByDate, type, screen.screenSize, darkMode]
    );

    return <Chart options={options} series={options.series} height={350} type='bar' />;
}

export function ColumnCharts() {
    const [deviceInfos, setDeviceInfos] = useState<DeviceData[]>([]);
    const { userData } = useUserInfoStore();

    useEffect(() => {
        const fetchDeviceInfos = async () => {
            const data = await DeviceService.getAllDevice(userData.id, 350);
            setDeviceInfos(data.devices);
        };
        fetchDeviceInfos();
    }, [userData.id]);

    return (
        <div className='w-full'>
            <Carousel
                placeholder={'Chưa có dữ liệu'}
                loop={true}
                prevArrow={({ handlePrev }) => (
                    <IconButton
                        placeholder={''}
                        variant='text'
                        color='white'
                        size='lg'
                        onClick={handlePrev}
                        className='!absolute top-2/4 left-4 -translate-y-2/4'
                    >
                        <ChevronDoubleLeftIcon className='w-8 h-8 text-green/1' />
                    </IconButton>
                )}
                nextArrow={({ handleNext }) => (
                    <IconButton
                        placeholder={''}
                        variant='text'
                        color='white'
                        size='lg'
                        onClick={handleNext}
                        className='!absolute top-2/4 !right-4 -translate-y-2/4'
                    >
                        <ChevronDoubleRightIcon className='w-8 h-8 text-green/1' />
                    </IconButton>
                )}
                navigation={({ setActiveIndex, activeIndex, length }) => (
                    <div className='absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2'>
                        {new Array(length).fill('').map((_, i) => (
                            <span
                                key={i}
                                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                                    activeIndex === i ? 'w-8 bg-green/1' : 'w-4 bg-gray-300'
                                }`}
                                onClick={() => setActiveIndex(i)}
                            />
                        ))}
                    </div>
                )}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                className='overflow-y-hidden bg-white rounded-3xl py-4 shadow-lg dark:bg-white/80'
            >
                {['temperature', 'airhumidity', 'light'].map((type) => (
                    <div key={type}>
                        <ColumnChart type={type} deviceInfos={deviceInfos} />
                    </div>
                ))}
            </Carousel>
        </div>
    );
}
