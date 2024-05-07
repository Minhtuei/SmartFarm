import { ACTIVATE_DEVICE, DEVICE_CATEGORY } from '@fe/constants';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Input, Typography, Spinner } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { validateDeviceName, validateLimit } from '@fe/utils';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { DeviceService } from '@fe/services';
export function DeviceInfoDialog({ open, onClose, device }: DeviceInfoDialogProps) {
    const deviceTypeNames = DEVICE_CATEGORY;
    const activateType = ACTIVATE_DEVICE;
    const navigate = useNavigate();
    const COLOR: ('red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'white')[] = [
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        'purple',
        'pink',
        'white'
    ];
    const [onChange, setOnChange] = useState(false);
    const [deviceName, setDeviceName] = useState(device?.deviceName || '');
    const [minLimit, setMinLimit] = useState(device?.minLimit || 0);
    const [maxLimit, setMaxLimit] = useState(device?.maxLimit || 0);
    const [schedule, setSchedule] = useState<Schedule[]>(device?.schedule || []);
    const [scheduleNumber, setScheduleNumber] = useState(0);
    const [nameError, setNameError] = useState('');
    const [limitError, setLimitError] = useState('');
    const [color, setColor] = useState(device?.deviceType === 'led' ? (device?.color as ColorType) : 'white');
    const [loading, setLoading] = useState(false);
    const handleOnClick = async () => {
        if (!validateDeviceName(deviceName)) {
            setNameError('Tên không hợp lệ');
            return;
        }
        if (!validateLimit(minLimit, maxLimit)) {
            setLimitError('Ngưỡng không hợp lệ');
            return;
        }
        setNameError('');
        setLimitError('');
        try {
            const data: DeviceUpdateInfo = {
                deviceName,
                minLimit,
                maxLimit,
                schedule,
                color
            };
            setLoading(true);
            setOnChange(false);
            const response = await DeviceService.updateDeviceInfo(device?.adaFruitID || '', device?.deviceType || '', data);
            setLoading(false);
            if (response.message === 'success') {
                device?.schedule?.unshift(...schedule.slice(device?.schedule?.length, schedule.length));
            }
        } catch (error) {
            console.log(error);
        }
    };
    const clearState = () => {
        setOnChange(false);
        setDeviceName(device?.deviceName || '');
        setMinLimit(device?.minLimit || 0);
        setMaxLimit(device?.maxLimit || 0);
        setSchedule(device?.schedule || []);
        setScheduleNumber(0);
        setNameError('');
        setLimitError('');
    };
    const isInfoUnchanged = () => {
        return (
            deviceName === device?.deviceName &&
            minLimit === device?.minLimit &&
            maxLimit === device?.maxLimit &&
            JSON.stringify(schedule) === JSON.stringify(device?.schedule) &&
            color === device?.color
        );
    };
    useEffect(() => {
        if (!open) {
            navigate('/device', { replace: true });
        }
        if (device) {
            clearState();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, device]);
    useEffect(() => {
        setColor(device?.color as ColorType);
    }, [device]);
    if (!device) return null;
    return (
        <Dialog placeholder={''} open={open} handler={onClose} className='max-h-[650px] overflow-y-auto no-scrollbar bg-green-100'>
            <DialogHeader placeholder={''} className='text-red-500'>
                {activateType[device?.deviceType as keyof typeof activateType]?.longName ||
                    deviceTypeNames[device?.deviceType as keyof typeof deviceTypeNames]?.longName}
            </DialogHeader>
            <DialogBody placeholder={'Nhập ID thiết bị'} className='flex flex-col gap-4 pl-8 '>
                <span className='flex items-center border-b border-green-700 py-2 italic text-green/1'>Thông tin thiết bị</span>
                <div className='flex flex-col items-center gap-y-2'>
                    <div className='flex items-center w-full '>
                        <Typography className='text-lg font-semibold w-1/2' placeholder={undefined}>
                            Mã thiết bị:
                        </Typography>
                        <Typography className='text-lg font-semibold w-1/2' placeholder={undefined}>
                            {device?.adaFruitID}
                        </Typography>
                    </div>
                    <div className='flex items-center w-full '>
                        <Typography className='text-lg font-semibold w-1/2' placeholder={undefined}>
                            Tên thiết bị:
                        </Typography>
                        <div className='w-1/2'>
                            <Input
                                type='device'
                                placeholder='Nhập tên thiết bị'
                                className='!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 w-[100px]'
                                labelProps={{ className: 'hidden' }}
                                containerProps={{ className: 'min-w-[50px] w-[50px]' }}
                                crossOrigin={'none'}
                                value={deviceName}
                                onChange={(e) => setDeviceName(e.target.value)}
                                disabled={!onChange}
                            />
                            {nameError && (
                                <Typography placeholder={''} className='text-red-500'>
                                    {nameError}
                                </Typography>
                            )}
                        </div>
                    </div>
                    <div className='flex items-center w-full '>
                        <Typography className='text-lg font-semibold w-1/2' placeholder={undefined}>
                            Trạng thái
                        </Typography>
                        <Typography
                            className='text-lg font-semibold'
                            placeholder={undefined}
                            style={{ color: device?.deviceState !== 'OFF' ? 'green' : 'red' }}
                        >
                            {device?.deviceState !== 'OFF' ? 'Đang hoạt động' : 'Đã tắt'}
                        </Typography>
                    </div>
                </div>
                <span className='flex items-center border-b border-green-700 py-2 italic text-green/1'>Thông tin cảm biến</span>
                <div className='flex flex-col items-center gap-y-2'>
                    <div className='flex items-center w-full '>
                        <Typography className='text-lg font-semibold w-1/2' placeholder={undefined}>
                            Giá trị:
                        </Typography>
                        <Typography className='text-lg font-semibold w-1/2' placeholder={undefined}>
                            {device?.lastValue} {deviceTypeNames[device?.deviceType as keyof typeof deviceTypeNames]?.unit}
                        </Typography>
                    </div>
                    <div className='flex items-center w-full '>
                        <Typography className='text-lg font-semibold w-1/2' placeholder={undefined}>
                            Thời gian cập nhật:
                        </Typography>
                        <Typography className='text-lg font-semibold w-1/2' placeholder={undefined}>
                            {device?.updatedTime}
                        </Typography>
                    </div>
                </div>
                <span className='flex items-center border-b border-green-700 py-2 italic text-green/1'>Thiết lập thông số</span>
                <div className='flex flex-col items-center gap-y-2'>
                    {device?.deviceType !== 'led' && device?.deviceType !== 'waterpump' ? (
                        <>
                            <div className='flex items-center w-full '>
                                <Typography className='text-lg font-semibold w-1/2' placeholder={undefined}>
                                    Ngưỡng dưới:
                                </Typography>
                                <div className='w-[100px]'>
                                    <Input
                                        type='device'
                                        placeholder='Nhập ID thiết bị'
                                        className='!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 w-[50px]'
                                        labelProps={{ className: 'hidden' }}
                                        containerProps={{ className: 'min-w-[50px] w-[50px]' }}
                                        crossOrigin={'none'}
                                        value={minLimit}
                                        onChange={(e) => setMinLimit(parseInt(e.target.value) || 0)}
                                        disabled={!onChange}
                                    />
                                    {limitError && (
                                        <Typography placeholder={''} className='text-red-500'>
                                            {limitError}
                                        </Typography>
                                    )}
                                </div>
                            </div>
                            <div className='flex items-center w-full '>
                                <Typography className='text-lg font-semibold w-1/2' placeholder={undefined}>
                                    Ngưỡng trên:
                                </Typography>
                                <div className='w-[100px]'>
                                    <Input
                                        type='device'
                                        placeholder='Nhập ID thiết bị'
                                        className='!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 w-[50px]'
                                        labelProps={{ className: 'hidden' }}
                                        containerProps={{ className: 'min-w-[50px] w-[50px]' }}
                                        crossOrigin={'none'}
                                        value={maxLimit}
                                        onChange={(e) => setMaxLimit(parseInt(e.target.value) || 0)}
                                        disabled={!onChange}
                                    />
                                    {limitError && (
                                        <Typography placeholder={''} className='text-red-500'>
                                            {limitError}
                                        </Typography>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='flex items-center w-full'>
                                <Typography placeholder={''} className='text-lg font-semibold w-1/2'>
                                    Tự động bật:
                                </Typography>
                                <div className='w-1/2 flex flex-col gap-y-1' id='scheduleHelp'>
                                    {schedule.map((item, index) => (
                                        <TimePicker.RangePicker
                                            key={index}
                                            placeholder={['--:--', '--:--']}
                                            format='HH:mm'
                                            popupClassName='z-[9999]'
                                            value={[dayjs(item.startTime, 'HH:mm'), dayjs(item.endTime, 'HH:mm')]}
                                            onChange={(_, timeString) => {
                                                const newSchedule = [...schedule];
                                                newSchedule[index] = {
                                                    startTime: timeString[0],
                                                    endTime: timeString[1]
                                                };
                                                setSchedule(newSchedule);
                                            }}
                                            className={onChange ? '' : 'pointer-events-none '}
                                        />
                                    ))}
                                    {Array.from({ length: scheduleNumber }).map((_, index) => (
                                        <TimePicker.RangePicker
                                            key={index}
                                            placeholder={['--:--', '--:--']}
                                            format='HH:mm'
                                            popupClassName='z-[9999]'
                                            onChange={(_, timeString) => {
                                                const newSchedule = [...schedule];
                                                newSchedule.push({
                                                    startTime: timeString[0],
                                                    endTime: timeString[1]
                                                });
                                                setSchedule(newSchedule);
                                                setScheduleNumber((prev) => prev - 1 || 0);
                                            }}
                                        />
                                    ))}
                                    <div className='flex items-center gap-x-2'>
                                        <IconButton
                                            placeholder={''}
                                            onClick={() => setScheduleNumber(scheduleNumber + 1)}
                                            disabled={!onChange}
                                            color='green'
                                            size='sm'
                                        >
                                            <span className='text-lg font-semibold'>+</span>
                                        </IconButton>
                                        <IconButton
                                            placeholder={''}
                                            onClick={() => {
                                                if (scheduleNumber > 0) setScheduleNumber(scheduleNumber - 1);
                                                else {
                                                    const newSchedule = [...schedule].slice(0, -1);
                                                    setSchedule(newSchedule);
                                                }
                                            }}
                                            disabled={!onChange}
                                            color='red'
                                            size='sm'
                                        >
                                            <span className='text-lg font-semibold'>-</span>
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                            {device?.deviceType === 'led' && (
                                <div className='flex items-center w-full '>
                                    <Typography className='text-lg font-semibold w-1/2' placeholder={undefined}>
                                        Màu sắc:
                                    </Typography>
                                    <div className='flex items-center gap-2 flex-wrap w-1/2'>
                                        {COLOR.map((colorEle) => (
                                            <Button
                                                key={colorEle}
                                                placeholder={''}
                                                variant='text'
                                                className={`w-8 h-8 rounded-full ${
                                                    colorEle === 'white'
                                                        ? 'bg-white hover:bg-gray-200 active:bg-gray-300'
                                                        : `bg-${colorEle}-500 hover:bg-${colorEle}-600 active:bg-${colorEle}-700`
                                                } hover:shadow-md active:shadow-lg`}
                                                style={{
                                                    border: colorEle === color ? '2px solid black' : 'none',
                                                    boxShadow: colorEle === color ? '0 0 0 2px black' : 'none'
                                                }}
                                                onClick={() => setColor(colorEle)}
                                                disabled={!onChange}
                                            >
                                                <span></span>
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </DialogBody>
            <DialogFooter placeholder={''}>
                <Button
                    placeholder={''}
                    color='blue'
                    onClick={() => {
                        setOnChange(true);
                    }}
                    className='mr-1'
                    disabled={onChange}
                >
                    <span>Chỉnh sửa</span>
                </Button>

                <Button
                    placeholder={''}
                    variant='gradient'
                    color='green'
                    onClick={() => handleOnClick()}
                    disabled={isInfoUnchanged() || !onChange}
                    className='mr-1'
                >
                    {loading ? <Spinner className='w-4 h-4 text-sm ' /> : <span>Lưu</span>}
                </Button>
                <Button placeholder={''} color='red' onClick={onClose} className='mr-1'>
                    <span>Trở về</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
