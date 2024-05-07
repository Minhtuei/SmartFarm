import {
    AppNavigationBar,
    ColumnCharts,
    ComponentSkeleton,
    LineChart,
    MiniDeviceInfo,
    RadioChart,
    Timer,
    WelcomeComponent
} from '@fe/components';
import { useDevicesStore } from '@fe/states';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import { Carousel, IconButton } from '@material-tailwind/react';
import { useEffect } from 'react';
import { useScreenSize } from '@fe/hooks';
export function DashboardPage() {
    const { deviceInfos } = useDevicesStore();
    const deviceTypes = ['temperature', 'airhumidity', 'earthhumidity', 'light'];
    const screen = useScreenSize();
    useEffect(() => {
        console.log(deviceInfos);
    }, [deviceInfos]);
    return (
        <>
            <AppNavigationBar title={'Thống kê'} />
            <div className='px-2 md:px-8 py-6 bg-white/2 dark:text-white/2 dark:bg-gray-700'>
                {deviceInfos.length === 0 ? (
                    <ComponentSkeleton />
                ) : (
                    <div className='min-h-screen w-full flex flex-col-reverse lg:flex-row gap-10 lg:justify-between'>
                        <div className='flex flex-col gap-4 lg:w-[480px] xl:w-[680px] flex-grow'>
                            {screen.screenSize >= 3 && <WelcomeComponent />}
                            <div className='w-full'>
                                <Carousel
                                    placeholder={'Chưa có dữ liệu'}
                                    // autoplay={true}
                                    // autoplayDelay={10000}
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
                                    {deviceTypes.map((type) => {
                                        const filteredDevices = deviceInfos.filter((device) => device.deviceType === type);
                                        return filteredDevices.length > 0 ? (
                                            <LineChart key={type} deviceInfos={filteredDevices} time='minute' />
                                        ) : null;
                                    })}
                                </Carousel>
                            </div>
                            <ColumnCharts />
                            <RadioChart deviceInfos={deviceInfos} />
                        </div>

                        <div className='flex flex-col items-center gap-4'>
                            {screen.screenSize < 3 && <WelcomeComponent />}
                            {screen.screenSize >= 3 && (
                                <div className='w-full h-[300px] lg:w-[250px] lg:h-[200px] lg:min-h-[200px] flex items-center bg-white  rounded-2xl  '>
                                    <Timer />
                                </div>
                            )}
                            {deviceInfos
                                .filter((device) => device.deviceType !== 'led' && device.deviceType !== 'waterpump')
                                .map((device, index) => (
                                    <MiniDeviceInfo key={index} {...device} />
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
