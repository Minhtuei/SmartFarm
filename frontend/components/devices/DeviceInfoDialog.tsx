import { ACTIVATE_DEVICE, DEVICE_CATEGORY } from '@fe/constants';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
export function DeviceInfoDialog({ open, onClose, device }: DeviceInfoDialogProps) {
    const handleOnClick = () => {
        console.log('Remove device');
        onClose();
    };
    const deviceTypeNames = DEVICE_CATEGORY;
    const activateType = ACTIVATE_DEVICE;
    const COLOR = ['red', 'green', 'blue', 'yellow', 'purple', 'pink'];
    const [onChange, setOnChange] = useState(false);
    const [deviceName, setDeviceName] = useState(device?.deviceName);
    const [minLimit, setMinLimit] = useState(device?.minLimit);
    const [maxLimit, setMaxLimit] = useState(device?.maxLimit);

    const clearState = () => {
        setOnChange(false);
        setDeviceName(device?.deviceName);
        setMinLimit(device?.minLimit);
        setMaxLimit(device?.maxLimit);
    };
    useEffect(() => {
        clearState();
    }, [open]);
    if (!device) return null;
    return (
        <Dialog placeholder={''} open={open} handler={onClose}>
            <DialogHeader placeholder={''} className='text-red-500'>
                {activateType[device?.deviceType as keyof typeof activateType]?.longName ||
                    deviceTypeNames[device?.deviceType as keyof typeof deviceTypeNames]?.longName}
            </DialogHeader>
            <DialogBody placeholder={'Nhập ID thiết bị'} className='flex flex-col gap-4 pl-8'>
                <span className='flex items-center border-b border-gray-300 py-2 italic text-green/1'>Thông tin thiết bị</span>
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
                        <Input
                            type='device'
                            placeholder='Nhập ID thiết bị'
                            className='!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 w-[100px]'
                            labelProps={{ className: 'hidden' }}
                            containerProps={{ className: 'min-w-[1/2] w-[50px]' }}
                            crossOrigin={'none'}
                            value={deviceName}
                            onChange={(e) => setDeviceName(e.target.value)}
                            disabled={!onChange}
                        />
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
                <span className='flex items-center border-b border-gray-300 py-2 italic text-green/1'>Thông tin cảm biến</span>
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
                {device?.deviceType !== 'waterpump' && (
                    <>
                        <span className='flex items-center border-b border-gray-300 py-2 italic text-green/1'>Thiết lập thông số</span>
                        <div className='flex flex-col items-center gap-y-2'>
                            {device?.deviceType !== 'led' ? (
                                <>
                                    <div className='flex items-center w-full '>
                                        <Typography className='text-lg font-semibold w-1/2' placeholder={undefined}>
                                            Ngưỡng dưới:
                                        </Typography>
                                        <Input
                                            type='device'
                                            placeholder='Nhập ID thiết bị'
                                            className='!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 w-[50px]'
                                            labelProps={{ className: 'hidden' }}
                                            containerProps={{ className: 'min-w-[50px] w-[50px]' }}
                                            crossOrigin={'none'}
                                            value={minLimit}
                                            onChange={(e) => setMinLimit(parseInt(e.target.value))}
                                            disabled={!onChange}
                                        />
                                    </div>
                                    <div className='flex items-center w-full '>
                                        <Typography className='text-lg font-semibold w-1/2' placeholder={undefined}>
                                            Ngưỡng trên:
                                        </Typography>
                                        <Input
                                            type='device'
                                            placeholder='Nhập ID thiết bị'
                                            className='!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 w-[50px]'
                                            labelProps={{ className: 'hidden' }}
                                            containerProps={{ className: 'min-w-[50px] w-[50px]' }}
                                            crossOrigin={'none'}
                                            value={maxLimit}
                                            onChange={(e) => setMaxLimit(parseInt(e.target.value))}
                                            disabled={!onChange}
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className='flex items-center w-full '>
                                    <Typography className='text-lg font-semibold w-1/2' placeholder={undefined}>
                                        Màu sắc:
                                    </Typography>
                                    <div className='flex items-center gap-2 flex-wrap w-1/2'>
                                        {COLOR.map((color) => (
                                            <Button
                                                key={color}
                                                placeholder={''}
                                                variant='text'
                                                className={`bg-${color}-500 hover:bg-${color}-600 w-8 h-8 rounded-full active:bg-${color}-700`}
                                            >
                                                <span></span>
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </DialogBody>
            <DialogFooter placeholder={''}>
                <Button
                    placeholder={''}
                    variant='text'
                    color='blue'
                    onClick={() => {
                        setOnChange(true);
                    }}
                    className='mr-1'
                >
                    <span>Chỉnh sửa</span>
                </Button>
                <Button placeholder={''} variant='text' color='red' onClick={clearState} className='mr-1'>
                    <span>Huỷ bỏ</span>
                </Button>
                <Button placeholder={''} variant='gradient' color='green' onClick={() => handleOnClick()}>
                    <span>Chấp nhận</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
