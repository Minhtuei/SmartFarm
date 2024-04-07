import { DEVICE_CATEGORY } from '@fe/constants';
import { Typography } from '@material-tailwind/react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
export function MiniDeviceInfo(device: DeviceData) {
    const deviceTypeNames = DEVICE_CATEGORY;
    return (
        <div
            className='h-[300px] md:w-[250px] md:h-[200px] md:min-h-[200px] rounded-2xl text-white flex justify-center flex-col items-center py-4 '
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
            {device?.deviceType === 'light' ? (
                <div className='flex flex-col items-center h-full'>
                    <Typography className='text-4xl font-semibold h-full' placeholder={undefined}>
                        {device?.lastValue} lux
                    </Typography>
                </div>
            ) : device?.deviceType === 'temperature' ? (
                <div className='flex flex-col items-center h-full'>
                    <Typography className='text-4xl font-semibold h-full' placeholder={undefined}>
                        {device?.lastValue}°C
                    </Typography>
                </div>
            ) : (
                <CircularProgressbar
                    value={device?.lastValue}
                    text={`${device?.lastValue}%`}
                    styles={buildStyles({
                        textColor: 'white',
                        pathColor: 'white',
                        trailColor: 'rgba(255,255,255,0.3)',
                        textSize: '24px'
                    })}
                />
            )}
        </div>
    );
}
