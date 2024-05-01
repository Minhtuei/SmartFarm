import { AppNavigationBar } from '@fe/components';
import { useNotificationStore } from '@fe/states';
// import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/sol_id";
import { NOTIFICATION_CATEGORY } from '@fe/constants';
import {
    Button,
    Card,
    CardBody,
    // Chip,
    CardFooter,
    // Tabs,
    // TabsHeader,
    // Tab,
    // Avatar,
    // IconButton,
    // Tooltip,
    CardHeader,
    // Input,
    Typography,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Input,
    IconButton
} from '@material-tailwind/react';
import moment from 'moment';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
const TABLE_HEAD = ['', 'Loại', 'Thiết bị', 'Nội dung', 'Thời gian'];
export function NotificationPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items to display per page
    const [rowsToDisplay, setRowsToDisplay] = useState<NotificationInfo[]>([]);
    const { notifications } = useNotificationStore();
    const [filteredNotifications, setFilteredNotifications] = useState(notifications);
    const [type, setType] = useState('all');
    useEffect(() => {
        setFilteredNotifications(notifications);
    }, [notifications]);
    useEffect(() => {
        // Calculate the index range of items to display for the current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // Slice the notifications array to display only the items for the current page
        setRowsToDisplay(filteredNotifications.slice(startIndex, endIndex));
        // console.log(rowsToDisplay);
    }, [currentPage, filteredNotifications]); // Update rowsToDisplay whenever currentPage changes

    // Event handler for "Previous" button click
    const handlePreviousClick = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Ensure currentPage doesn't go below 1
    };

    // Event handler for "Next" button click
    const handleNextClick = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(notifications.length / itemsPerPage))); // Ensure currentPage doesn't exceed total number of pages
    };
    const [searchValue, setSearchValue] = useState('');

    const [openTypeMenu, setOpenTypeMenu] = useState(false);
    return (
        <>
            <AppNavigationBar title='Thông báo' />
            <div className='px-8 py-6 bg-white/2 dark:text-white/2 dark:bg-gray-700 '>
                <Card className='h-[calc(100vh-130px)] w-full'>
                    <CardHeader floated={false} shadow={false} className='rounded-none min-h-[50px]'>
                        <div className='flex items-center gap-2'>
                            <Menu>
                                <MenuHandler>
                                    <IconButton placeholder={''} className='px-3 py-2 bg-green/1 '>
                                        <AdjustmentsHorizontalIcon className='w-6 h-6' />
                                    </IconButton>
                                </MenuHandler>
                                <MenuList placeholder={''} className='flex flex-col gap-2'>
                                    <MenuItem placeholder={''} className='flex items-center gap-2 pointer-events-none'>
                                        <Typography variant='small' color='blue-gray' className='font-normal'>
                                            Sắp xếp theo
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem
                                        placeholder={''}
                                        className={`flex items-center gap-2 ${type === 'all' ? 'bg-blue-gray-50' : ''}`}
                                        onClick={() => {
                                            setFilteredNotifications(notifications); // Reset filteredNotifications to all notifications
                                            setCurrentPage(1); // Reset currentPage to 1 when filtering
                                        }}
                                    >
                                        <Typography variant='small' color='blue-gray' className='font-normal'>
                                            Tất cả
                                        </Typography>
                                    </MenuItem>
                                    <Menu placement='right-start' open={openTypeMenu} handler={setOpenTypeMenu} allowHover offset={15}>
                                        <MenuHandler className='flex items-center gap-2'>
                                            <MenuItem placeholder={''} className='flex items-center gap-2'>
                                                <Typography variant='small' color='blue-gray' className='font-normal'>
                                                    Loại
                                                </Typography>
                                                <ChevronUpIcon
                                                    strokeWidth={2.5}
                                                    className={`h-3.5 w-3.5 transition-transform ${openTypeMenu ? 'rotate-90' : ''}`}
                                                />
                                            </MenuItem>
                                        </MenuHandler>
                                        <MenuList>
                                            {Object.keys(NOTIFICATION_CATEGORY).map((category, index) => (
                                                <MenuItem
                                                    key={index}
                                                    placeholder={''}
                                                    className={`flex items-center gap-2 ${type === category ? 'bg-blue-gray-50' : ''}`}
                                                    onClick={() => {
                                                        setFilteredNotifications(
                                                            notifications.filter(
                                                                (notification) =>
                                                                    notification.notificationType === category &&
                                                                    notification.deviceName
                                                                        .toLowerCase()
                                                                        .includes(searchValue.toLowerCase() || '')
                                                            )
                                                        );
                                                        setCurrentPage(1); // Reset currentPage to 1 when filtering
                                                        setOpenTypeMenu(false);
                                                        setType(category);
                                                    }}
                                                >
                                                    {NOTIFICATION_CATEGORY[category as keyof typeof NOTIFICATION_CATEGORY].icon}
                                                    <Typography variant='small' color='blue-gray' className='font-normal'>
                                                        {NOTIFICATION_CATEGORY[category as keyof typeof NOTIFICATION_CATEGORY].label}
                                                    </Typography>
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </Menu>
                                </MenuList>
                            </Menu>
                            <Input
                                type='device'
                                placeholder='Tìm kiếm thông báo'
                                className='!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10'
                                labelProps={{
                                    className: 'hidden'
                                }}
                                containerProps={{ className: 'min-w-[100px] w-1/4' }}
                                crossOrigin={'true'}
                                value={searchValue}
                                onChange={(e) => {
                                    setSearchValue(e.target.value);
                                    if (e.target.value === '') {
                                        setFilteredNotifications(
                                            notifications.filter((notification) => type === 'all' || notification.notificationType === type)
                                        );
                                    } else {
                                        setFilteredNotifications(
                                            notifications.filter(
                                                (notification) =>
                                                    notification.deviceName.toLowerCase().includes(e.target.value.toLowerCase()) &&
                                                    (type === 'all' || notification.notificationType === type)
                                            )
                                        );
                                    }
                                    setCurrentPage(1); // Reset currentPage to 1 when filtering
                                }}
                            />{' '}
                            <IconButton color='green' placeholder={''} className='px-3 py-2 hover:shadow-none ' onClick={() => {}}>
                                <MagnifyingGlassIcon className='w-6 h-6' />
                            </IconButton>
                        </div>
                    </CardHeader>
                    <CardBody className='overflow-scroll px-0'>
                        {rowsToDisplay.length > 0 ? (
                            <table className='mt-4 w-full min-w-max table-auto text-left'>
                                <thead>
                                    <tr>
                                        {TABLE_HEAD.map((head) => (
                                            <th
                                                key={head}
                                                className='cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50'
                                            >
                                                <Typography
                                                    variant='small'
                                                    color='blue-gray'
                                                    className='flex items-center justify-between gap-2 font-normal leading-none opacity-70'
                                                >
                                                    {head}{' '}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className='abcabc'>
                                    {rowsToDisplay.map(({ _id, deviceName, context, createdAt, notificationType }, index) => {
                                        const isLast = index === notifications.length - 1;
                                        const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

                                        return (
                                            <tr key={_id}>
                                                <td className={classes}>
                                                    <div className='cols-4 '>{NOTIFICATION_CATEGORY[notificationType].icon}</div>
                                                </td>
                                                <td className={classes}>
                                                    <div className='flex justify-between items-center gap-4'>
                                                        <div className='cols-4 '>
                                                            <Typography variant='small' color='blue-gray' className='font-normal'>
                                                                {NOTIFICATION_CATEGORY[notificationType].label}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className='flex flex-col'>
                                                        <Typography variant='small' color='blue-gray' className='font-normal'>
                                                            {deviceName}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className='w-max'>
                                                        <Typography variant='small' color='blue-gray' className='font-normal'>
                                                            {context}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant='small' color='blue-gray' className='font-normal'>
                                                        {moment(createdAt).format('HH:mm DD/MM/YYYY')}
                                                    </Typography>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        ) : (
                            <div className='flex items-center justify-center h-full'>
                                <Typography variant='h6' color='blue-gray' className='font-normal'>
                                    Hiện tại không có thông báo nào
                                </Typography>
                            </div>
                        )}
                    </CardBody>
                    <CardFooter className='flex items-center justify-between border-t border-blue-gray-50 p-4'>
                        <div className='flex items-center gap-2'>
                            <Typography variant='small' color='blue-gray' className='font-normal'>
                                Trang
                            </Typography>
                            <Input
                                type='number'
                                placeholder='1'
                                className='!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 max-w-[80px]'
                                labelProps={{
                                    className: 'hidden'
                                }}
                                containerProps={{ className: 'min-w-[50px]' }}
                                crossOrigin={'true'}
                                value={currentPage}
                                onChange={(e) => {
                                    setCurrentPage(
                                        parseInt(e.target.value) > Math.ceil(notifications.length / itemsPerPage)
                                            ? 1
                                            : parseInt(e.target.value) || 1
                                    );
                                }}
                            />
                            <Typography variant='small' color='blue-gray' className='font-normal '>
                                /
                            </Typography>
                            <Typography variant='small' color='blue-gray' className='font-normal'>
                                {Math.ceil(notifications.length / itemsPerPage || 1)}
                            </Typography>
                        </div>

                        <div className='flex gap-2 items-center'>
                            <Button variant='outlined' size='sm' onClick={() => handlePreviousClick()}>
                                Trang trước
                            </Button>
                            <Button variant='outlined' size='sm' onClick={() => handleNextClick()}>
                                Trang sau
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
