import { AppNavigationBar, NewDeviceDialog, RemoveDeviceDialog, DeviceInfoDialog } from '@fe/components';
import { useDevicesStore } from '@fe/states';
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon, PlusIcon, TrashIcon } from '@heroicons/react/20/solid';
import {
    Button,
    Card,
    CardBody,
    IconButton,
    Input,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Switch,
    Typography,
    Spinner
} from '@material-tailwind/react';
import { useState } from 'react';
import { DeviceService } from '@fe/services';
import { MiniDeviceImage } from '@fe/components';
import { filterDeviceByType, filterDeviceByName } from '@fe/utils';
export function DevicePage() {
    const [openNewDeviceDialog, setOpenNewDeviceDialog] = useState<boolean>(false);
    const [openRemoveDeviceDialog, setOpenRemoveDeviceDialog] = useState<boolean>(false);
    const [openDeviceDialog, setOpenDeviceDialog] = useState<boolean>(false);
    const [device, setDevice] = useState<DeviceData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const { deviceInfos } = useDevicesStore();
    const deviceTypeNames: { [key: string]: string } = {
        all: 'Tất cả',
        led: 'Đèn LED',
        earthhumidity: 'Cảm biến độ ẩm đất',
        airhumidity: 'Cảm biến độ ẩm không khí',
        temperature: 'Cảm biến nhiệt độ',
        waterpump: 'Máy bơm nước',
        light: 'Cảm biến ánh sáng'
    };
    const handleTriggerDevice = (adaFruitID: string) => {
        return async (e: React.ChangeEvent<HTMLInputElement>) => {
            const device = deviceInfos.find((device) => device.adaFruitID === adaFruitID);
            setIsLoading(true);
            try {
                if (device) {
                    const deviceState = e.target.checked ? 'ON' : 'OFF';
                    await DeviceService.triggerDevice(deviceState, adaFruitID);
                    deviceInfos.find((device) => device.adaFruitID === adaFruitID)!.deviceState = deviceState;
                }
            } finally {
                setIsLoading(false);
            }
        };
    };
    const handleOpenDeviceInfoDialog = (adaFruitID: string) => {
        setOpenDeviceDialog(true);
        setDevice(deviceInfos.find((device) => device.adaFruitID === adaFruitID) || null);
    };
    return (
        <>
            <AppNavigationBar title={'Device'} />
            <div className='px-8 py-6 bg-white/2 dark:text-white/2 dark:bg-gray-700 '>
                <div className='h-[calc(100vh-130px)] flex flex-col overflow-hidden relative gap-y-4 overflow-y-auto pr-4'>
                    <div className='flex items-center gap-2'>
                        <Menu>
                            <MenuHandler>
                                <IconButton placeholder={''} className='px-3 py-2 bg-green/1 '>
                                    <AdjustmentsHorizontalIcon className='w-6 h-6' />
                                </IconButton>
                            </MenuHandler>
                            <MenuList placeholder={''}>
                                {Object.keys(deviceTypeNames).map((deviceType) => (
                                    <MenuItem
                                        placeholder={''}
                                        key={deviceType}
                                        onClick={() => {
                                            filterDeviceByType(deviceType, deviceInfos);
                                        }}
                                    >
                                        {deviceTypeNames[deviceType] as keyof typeof deviceTypeNames}
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </Menu>
                        <Input
                            type='device'
                            placeholder='Search for a device...'
                            className='!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10'
                            labelProps={{
                                className: 'hidden'
                            }}
                            containerProps={{ className: 'min-w-[100px] w-1/4' }}
                            crossOrigin={'true'}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />{' '}
                        <IconButton
                            color='green'
                            placeholder={''}
                            className='px-3 py-2 hover:shadow-none '
                            onClick={() => {
                                filterDeviceByName(searchValue, deviceInfos);
                            }}
                        >
                            <MagnifyingGlassIcon className='w-6 h-6' />
                        </IconButton>
                        <IconButton
                            color='blue'
                            placeholder={''}
                            className='px-3 py-2 hover:shadow-none '
                            onClick={() => setOpenNewDeviceDialog(true)}
                        >
                            <PlusIcon className='w-6 h-6' />
                        </IconButton>
                        <IconButton
                            color='red'
                            placeholder={''}
                            className='px-3 py-2 hover:shadow-none '
                            onClick={() => setOpenRemoveDeviceDialog(true)}
                        >
                            <TrashIcon className='w-6 h-6' />
                        </IconButton>
                    </div>
                    <div className='flex flex-wrap justify-between gap-4'>
                        {deviceInfos.map((device) => (
                            <Card placeholder={''} id={device.adaFruitID} key={device.adaFruitID} className='flex-grow shrink'>
                                <CardBody placeholder={''} className='flex items-center'>
                                    <Typography color='blue' className='ml-2 font-semibold text-lg' placeholder={''}>
                                        {deviceTypeNames[device.deviceType]}
                                    </Typography>
                                    {device.deviceState !== 'NONE' && (
                                        <div className=' flex ml-auto'>
                                            <Switch
                                                crossOrigin='true'
                                                color='blue'
                                                checked={device.deviceState === 'ON'}
                                                onChange={handleTriggerDevice(device.adaFruitID)}
                                            />
                                        </div>
                                    )}
                                </CardBody>
                                <CardBody placeholder={''} className='flex items-center py-0 max-w-full gap-2 '>
                                    <div className='w-[100px] h-[100px] shrink-0'>
                                        <MiniDeviceImage deviceType={device.deviceType} />
                                    </div>
                                    <div className='flex flex-1 gap-1'>
                                        <div className='flex flex-col gap-1'>
                                            <Typography className='text-md font-semibold' placeholder={''}>
                                                Tên thiết bị:
                                            </Typography>
                                            <Typography className='text-md font-semibold' placeholder={''}>
                                                Mã thiết bị:
                                            </Typography>
                                            <Typography className='text-md font-semibold' placeholder={''}>
                                                Trạng thái:
                                            </Typography>
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <Typography className='text-md' placeholder={''}>
                                                {device.deviceName}
                                            </Typography>
                                            <Typography className='text-md truncate' placeholder={''}>
                                                {device.adaFruitID}
                                            </Typography>
                                            {device.deviceState !== 'OFF' ? (
                                                <Typography color='green' className='text-md' placeholder={''}>
                                                    Đang hoạt động
                                                </Typography>
                                            ) : (
                                                <Typography color='red' className='text-md' placeholder={''}>
                                                    Đã tắt
                                                </Typography>
                                            )}
                                        </div>
                                    </div>
                                </CardBody>
                                <CardBody placeholder={''} className='flex items-center gap-2'>
                                    <Button
                                        placeholder={''}
                                        variant='outlined'
                                        color='blue'
                                        size='sm'
                                        onClick={() => handleOpenDeviceInfoDialog(device.adaFruitID)}
                                    >
                                        Xem chi tiết
                                    </Button>
                                    <Button
                                        placeholder={''}
                                        variant='outlined'
                                        color='red'
                                        size='sm'
                                        onClick={() => setOpenRemoveDeviceDialog(true)}
                                    >
                                        Xóa thiết bị
                                    </Button>
                                </CardBody>
                            </Card>
                        ))}
                        <Card
                            placeholder={''}
                            onClick={() => setOpenNewDeviceDialog(true)}
                            className='w-[400px] flex items-center justify-center cursor-pointer shrink'
                        >
                            <CardBody placeholder={''} className='flex flex-col items-center'>
                                <PlusIcon className='w-14 h-14'></PlusIcon>
                                <Typography className='ml-2' placeholder={''}>
                                    Thêm thiết bị
                                </Typography>
                            </CardBody>
                        </Card>
                    </div>
                    <NewDeviceDialog open={openNewDeviceDialog} onClose={() => setOpenNewDeviceDialog(false)} />
                    <RemoveDeviceDialog open={openRemoveDeviceDialog} onClose={() => setOpenRemoveDeviceDialog(false)} />
                    <DeviceInfoDialog open={openDeviceDialog} onClose={() => setOpenDeviceDialog(false)} device={device} />
                </div>
                {isLoading && (
                    <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                        <div className='flex items-center p-4 bg-white rounded-lg'>
                            <Typography placeholder={''} className='mr-2 text-lg italic font-semibold' variant='h3'>
                                Đang xử lý...
                            </Typography>
                            <Spinner className='w-8 h-8' />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
