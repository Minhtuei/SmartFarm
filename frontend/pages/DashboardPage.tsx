import { AppNavigationBar } from '@fe/components';
import { Typography } from '@material-tailwind/react';
import { FaTemperatureHigh } from 'react-icons/fa';
import { IconButton, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/20/solid';
import weatherScreen from '@fe/assets/weather-screen.png';
import { MiniDeviceInfo } from '@fe/components';
import { useDevicesStore } from '@fe/states';
import moment from 'moment';
import { LineChart } from '@fe/components';
export function DashboardPage() {
    const time = moment().format('HH:mm');
    const day = moment().format('DD/MM/YYYY');
    const { deviceInfos } = useDevicesStore();
    return (
        <>
            <AppNavigationBar title={'Dashboard'} />
            <div className='px-8 py-6 bg-white/2 dark:text-white/2 dark:bg-gray-700'>
                <div className='min-h-screen w-full flex flex-col md:flex-row gap-4 md:justify-between'>
                    <div className='flex flex-col gap-4'>
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
                        <LineChart deviceInfos={deviceInfos.filter((device) => device.deviceType === 'temperature')} time={'minute'} />
                        <Menu>
                            <MenuHandler>
                                <IconButton placeholder={''} className='px-3 py-2 bg-green/1 '>
                                    <AdjustmentsHorizontalIcon className='w-6 h-6' />
                                </IconButton>
                            </MenuHandler>
                            <MenuList placeholder={''}>
                                <MenuItem placeholder={''}>Phút</MenuItem>
                                <MenuItem placeholder={''}>Giờ</MenuItem>
                                <MenuItem placeholder={''}>Ngày</MenuItem>
                                <MenuItem placeholder={''}>Tuần</MenuItem>
                                <MenuItem placeholder={''}>Tháng</MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                    <div className='flex flex-col items-center gap-4'>
                        {deviceInfos
                            .filter((device) => device.deviceType !== 'led' && device.deviceType !== 'waterpump')
                            .map((device, index) => (
                                <MiniDeviceInfo key={index} {...device} />
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}
