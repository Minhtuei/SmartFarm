import LightSensor from '@fe/assets/light-sensor.png';
import { AppNavigationBar } from '@fe/components';
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
import { Pagination } from '@fe/components';
import { useState } from 'react';
import { NewDeviceDialog } from '@fe/components';
import { useEffect } from 'react';
import { DeviceService } from '@fe/services';
import { useUserInfoStore } from '@fe/states';
export function DevicePage() {
    const [openNewDeviceDialog, setOpenNewDeviceDialog] = useState(false);
    const [deviceList, setDeviceList] = useState<DeviceCard[]>([]);
    const { isAuth } = useUserInfoStore();
    useEffect(() => {
        const fetchAllDevices = async () => {
            if (!isAuth) return;
            try {
                const response = await DeviceService.getAllDevice();
                const deviceList: DeviceCard[] = [];
                for (const device of response.devices) {
                    const deviceCard: DeviceCard = {
                        id: device._id,
                        name: device.deviceName,
                        icon: <BoltIcon className='w-6 h-6' />,
                        image: LightSensor,
                        state: device.deviceState,
                        type: device.deviceType
                    };
                    deviceList.push(deviceCard);
                }
                setDeviceList(deviceList);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllDevices();
    }, [isAuth]);
    return (
        <>
            <AppNavigationBar title={'Device'} />
            <div className='px-8 py-6 bg-white/2 dark:text-white/2 dark:bg-gray-700 '>
                <div className='h-[calc(100vh-130px)] flex flex-col overflow-hidden relative gap-y-2 overflow-y-auto lg:overflow-hidden'>
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
                            crossOrigin={'none'}
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
                        {deviceList.map((device) => (
                            <Card key={device.id} className='w-[400px] cursor-pointer shrink'>
                                <CardBody className='flex items-center'>
                                    {device.icon}
                                    <Typography color='blue' className='ml-2' placeholder={''}>
                                        {device.name}
                                    </Typography>
                                    {device.state !== 'NONE' && (
                                        <div className=' flex ml-auto'>
                                            <Switch color='blue' defaultChecked={device.state === 'ON'} />
                                        </div>
                                    )}
                                </CardBody>
                                <CardBody className='flex items-center py-0 max-w-full '>
                                    <div className='w-[100px] h-[100px] shrink-0'>
                                        <img src={device.image} alt='device' className='w-full h-full object-cover' />
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
                                                {device.name}
                                            </Typography>
                                            <Typography className='text-md truncate' placeholder={''}>
                                                {device.id}
                                            </Typography>
                                            <Typography color='green' className='text-md' placeholder={''}>
                                                Đang hoạt động
                                            </Typography>
                                        </div>
                                    </div>
                                </CardBody>
                                <CardBody className='flex items-center gap-2'>
                                    <Button variant='outlined' color='blue' size='sm'>
                                        Xem chi tiết
                                    </Button>
                                    <Button variant='outlined' color='red' size='sm'>
                                        Xóa thiết bị
                                    </Button>
                                </CardBody>
                            </Card>
                        ))}
                        <Card
                            onClick={() => setOpenNewDeviceDialog(true)}
                            className='w-[400px] flex items-center justify-center cursor-pointer shrink'
                        >
                            <CardBody className='flex flex-col items-center'>
                                <PlusIcon className='w-14 h-14'></PlusIcon>
                                <Typography className='ml-2' placeholder={''}>
                                    Thêm thiết bị
                                </Typography>
                            </CardBody>
                        </Card>
                    </div>
                    <NewDeviceDialog open={openNewDeviceDialog} onClose={() => setOpenNewDeviceDialog(false)} />
                    <div className='absolute bottom-0 flex left-1/2 -translate-x-1/2'>
                        <Pagination />
                    </div>
                </div>
            </div>
        </>
    );
}
