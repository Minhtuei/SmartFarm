import LightSensor from '@fe/assets/light-sensor.png';
import { AppNavigationBar, NewDeviceDialog } from '@fe/components';
import { useDevicesStore } from '@fe/states';
import { AdjustmentsHorizontalIcon, BoltIcon, MagnifyingGlassIcon, PlusIcon, TrashIcon } from '@heroicons/react/20/solid';
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
    Typography
} from '@material-tailwind/react';
import { useState } from 'react';
import { DeviceService } from '@fe/services';
export function DevicePage() {
    const [openNewDeviceDialog, setOpenNewDeviceDialog] = useState<boolean>(false);
    const { deviceInfos } = useDevicesStore();
    const deviceTypeNames = {
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
            if (device) {
                const deviceState = e.target.checked ? 'ON' : 'OFF';
                await DeviceService.triggerDevice(deviceState, adaFruitID);
            }
        };
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
                                <MenuItem placeholder={''}>Menu Item 1</MenuItem>
                                <MenuItem placeholder={''}>Menu Item 2</MenuItem>
                                <MenuItem placeholder={''}>Menu Item 3</MenuItem>
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
                        />{' '}
                        <IconButton color='green' placeholder={''} className='px-3 py-2 hover:shadow-none '>
                            <MagnifyingGlassIcon className='w-6 h-6' />
                        </IconButton>
                        <IconButton color='blue' placeholder={''} className='px-3 py-2 hover:shadow-none '>
                            <PlusIcon className='w-6 h-6' />
                        </IconButton>
                        <IconButton color='red' placeholder={''} className='px-3 py-2 hover:shadow-none '>
                            <TrashIcon className='w-6 h-6' />
                        </IconButton>
                    </div>
                    <div className='flex flex-wrap justify-between gap-y-4'>
                        {deviceInfos.map((device) => (
                            <Card placeholder={''} key={device.adaFruitID} className='w-[400px] shrink'>
                                <CardBody placeholder={''} className='flex items-center'>
                                    <BoltIcon className='w-8 h-8 text-yellow-500' />
                                    <Typography color='blue' className='ml-2' placeholder={''}>
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
                                <CardBody placeholder={''} className='flex items-center py-0 max-w-full '>
                                    <div className='w-[100px] h-[100px] shrink-0'>
                                        <img src={LightSensor} alt='device' className='w-full h-full object-cover' />
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
                                    <Button placeholder={''} variant='outlined' color='blue' size='sm'>
                                        Xem chi tiết
                                    </Button>
                                    <Button placeholder={''} variant='outlined' color='red' size='sm'>
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
                </div>
            </div>
        </>
    );
}
