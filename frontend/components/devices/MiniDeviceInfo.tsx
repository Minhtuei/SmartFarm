import { DEVICE_CATEGORY } from '@fe/constants';
import { Typography } from '@material-tailwind/react';
import moment from 'moment';
export function MiniDeviceInfo(device: DeviceData) {
    const deviceUnit = device?.deviceType === 'temperature' ? '°C' : device?.deviceType === 'light' ? 'lux' : '%';
    const deviceTypeNames = DEVICE_CATEGORY;
    return (
        <div
            className='h-[300px] w-4/5 lg:w-[250px] lg:h-[200px] lg:min-h-[200px] rounded-2xl text-white flex justify-center flex-col items-center py-4 '
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${deviceTypeNames[
                    device?.deviceType as keyof typeof deviceTypeNames
                ]?.image})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }}
        >
            <div className='flex items-center '>
                <Typography className='text-lg font-semibold' placeholder={undefined}>
                    {deviceTypeNames[device?.deviceType as keyof typeof deviceTypeNames]?.shortName}
                </Typography>

                {deviceTypeNames[device?.deviceType as keyof typeof deviceTypeNames]?.icon}
            </div>
            <div className='flex flex-col items-center h-full'>
                <Typography className='text-4xl font-semibold h-full flex flex-col justify-center ' placeholder={undefined}>
                    {`${device?.lastValue} ${deviceUnit}`}
                </Typography>
            </div>
            <div className='flex items-center justify-center'>
                <Typography className='text-sm' placeholder={undefined}>
                    {device?.updatedTime ? moment(new Date(device.updatedTime)).format('HH:mm DD/MM/YYYY') : ''}
                </Typography>
            </div>
        </div>
    );
}
