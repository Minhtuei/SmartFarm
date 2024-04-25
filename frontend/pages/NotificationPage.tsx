import { AppNavigationBar } from '@fe/components';
import { ButtonInfo } from '../components/Notify';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { useNotificationStore } from '@fe/states';
// import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/sol_id";
import {
    Card,
    CardHeader,
    // Input,
    Typography,
    Button,
    CardBody,
    // Chip,
    CardFooter
    // Tabs,
    // TabsHeader,
    // Tab,
    // Avatar,
    // IconButton,
    // Tooltip,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import moment from 'moment';
const TABLE_HEAD = ['Noti_id', 'Tên Thiết bị', 'Nội Dung', 'Thời gian', 'Loại thông báo'];
import { NOTIFICATION_CATEGORY } from '@fe/constants';
export function NotificationPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; // Number of items to display per page
    const [rowsToDisplay, setRowsToDisplay] = useState<NotificationInfo[]>([]);
    const { notifications } = useNotificationStore();
    useEffect(() => {
        // Calculate the index range of items to display for the current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // Slice the notifications array to display only the items for the current page
        setRowsToDisplay(notifications.slice(startIndex, endIndex));
        // console.log(rowsToDisplay);
    }, [currentPage, notifications]); // Update rowsToDisplay whenever currentPage changes

    // Event handler for "Previous" button click
    const handlePreviousClick = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Ensure currentPage doesn't go below 1
    };

    // Event handler for "Next" button click
    const handleNextClick = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(notifications.length / itemsPerPage))); // Ensure currentPage doesn't exceed total number of pages
    };
    useEffect(() => {
        console.log(notifications);
    }, [notifications]);
    return (
        <>
            <AppNavigationBar title='Thông báo' />
            <div className='px-8 py-6 bg-white/2 dark:text-white/2 dark:bg-gray-700 '>
                <Card className='h-[calc(100vh-130px)] w-full'>
                    <CardHeader floated={false} shadow={false} className='rounded-none'>
                        <div className='mb-8 flex items-center justify-between gap-8'>
                            <div>
                                <Typography variant='h5' color='blue-gray'>
                                    Thông Báo
                                </Typography>
                                <Typography color='gray' className='mt-1 font-normal'>
                                    Click vào biểu tượng <ButtonInfo link='#' /> để xem chi tiết
                                </Typography>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody className='overflow-scroll px-0'>
                        {rowsToDisplay.length > 0 ? (
                            <table className='mt-4 w-full min-w-max table-auto text-left'>
                                <thead>
                                    <tr>
                                        {TABLE_HEAD.map((head, index) => (
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
                                                    {index !== TABLE_HEAD.length - 1 && (
                                                        <ChevronUpDownIcon strokeWidth={2} className='h-4 w-4' />
                                                    )}
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
                                                    <div className='flex items-center gap-3'>
                                                        <Typography variant='small' color='blue-gray' className='font-normal'>
                                                            {_id}
                                                        </Typography>
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
                                                        {moment(createdAt).format('DD/MM/YYYY HH:mm')}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <div className='flex justify-between items-center gap-4'>
                                                        <div className='cols-4 '>{NOTIFICATION_CATEGORY[notificationType].icon}</div>
                                                        <div className='cols-4 '>
                                                            <Typography variant='small' color='blue-gray' className='font-normal'>
                                                                {NOTIFICATION_CATEGORY[notificationType].label}
                                                            </Typography>
                                                        </div>
                                                        <div className='cols-4 '>
                                                            <ButtonInfo link={`/notification/${_id}`} />
                                                        </div>
                                                    </div>
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
                        <Typography variant='small' color='blue-gray' className='font-normal'>
                            Trang {currentPage} / {Math.ceil(notifications.length / itemsPerPage) || 1}
                        </Typography>
                        <div className='flex gap-2'>
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
