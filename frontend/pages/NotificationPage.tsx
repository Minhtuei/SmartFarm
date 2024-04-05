import { AppNavigationBar } from '@fe/components';
import { Warning, Error, Success, Setting, ButtonInfo } from '../components/Notify';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
// import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
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

const TABLE_HEAD = ['NotiID', 'Tên Thiết bị', 'Nội Dung', 'Thời gian', 'Loại thông báo'];
const TABLE_ROWS = [
    {
        id: 1,
        nameDevice: 'Máy cảm biến',
        content: 'Nhiệt độ vượt quá mức cho phép.',
        time: new Date('2022-04-04'),
        typ: 'warning',
        link: '#'
    },
    {
        id: 2,
        nameDevice: 'Máy cảm lanh',
        content: 'Troi nong qua.',
        time: new Date('2024-04-01'),
        typ: 'error',
        link: '#'
    },
    {
        id: 3,
        nameDevice: 'Toan',
        content: 'Troi nong qua, qua.',
        time: new Date('2024-03-04'),
        typ: 'success',
        link: '#'
    },
    {
        id: 4,
        nameDevice: 'Minh Toan',
        content: 'Nong qua, qua.',
        time: new Date('2024-05-04'),
        typ: 'setting',
        link: '#'
    },
    {
        id: 5,
        nameDevice: 'Máy đo áp suất',
        content: 'Áp suất cao hơn mức tiêu chuẩn.',
        time: new Date('2024-04-05'),
        typ: 'warning',
        link: '#'
    },
    {
        id: 6,
        nameDevice: 'Máy lọc không khí',
        content: 'Chất lượng không khí xuống thấp.',
        time: new Date('2024-04-05'),
        typ: 'error',
        link: '#'
    },
    {
        id: 7,
        nameDevice: 'Máy phát điện',
        content: 'Có sự cố kỹ thuật, không khởi động được.',
        time: new Date('2024-04-04'),
        typ: 'error',
        link: '#'
    },
    {
        id: 8,
        nameDevice: 'Máy bơm nước',
        content: 'Lỗi kết nối mạng.',
        time: new Date('2024-04-03'),
        typ: 'error',
        link: '#'
    },
    {
        id: 9,
        nameDevice: 'Cảm biến độ ẩm',
        content: 'Độ ẩm trong không khí tăng đột ngột.',
        time: new Date('2024-04-02'),
        typ: 'warning',
        link: '#'
    },
    {
        id: 10,
        nameDevice: 'Máy quạt',
        content: 'Lưu lượng gió giảm đáng kể.',
        time: new Date('2024-04-01'),
        typ: 'warning',
        link: '#'
    }
];

export function NotificationPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; // Number of items to display per page
    const [rowsToDisplay, setRowsToDisplay] = useState<Any>([]);

    useEffect(() => {
        // Calculate the index range of items to display for the current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // Slice the TABLE_ROWS array to display only the items for the current page
        setRowsToDisplay(TABLE_ROWS.slice(startIndex, endIndex));
        // console.log(rowsToDisplay);
    }, [currentPage]); // Update rowsToDisplay whenever currentPage changes

    // Event handler for "Previous" button click
    const handlePreviousClick = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Ensure currentPage doesn't go below 1
    };

    // Event handler for "Next" button click
    const handleNextClick = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(TABLE_ROWS.length / itemsPerPage))); // Ensure currentPage doesn't exceed total number of pages
    };

    return (
        <>
            <AppNavigationBar title='Notifications' />
            <div className='p-4 bg-white/2'>
                <Card className='h-full w-full'>
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
                                {rowsToDisplay.map(({ id, nameDevice, content, time, typ, link }, index) => {
                                    const isLast = index === TABLE_ROWS.length - 1;
                                    const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';
                                    return (
                                        <tr key={id}>
                                            <td className={classes}>
                                                <div className='flex items-center gap-3'>
                                                    <Typography variant='small' color='blue-gray' className='font-normal'>
                                                        {id}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className='flex flex-col'>
                                                    <Typography variant='small' color='blue-gray' className='font-normal'>
                                                        {nameDevice}
                                                    </Typography>
                                                    {/* <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal opacity-70"
                                                        >
                                                            {org}
                                                        </Typography> */}
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className='w-max'>
                                                    <Typography variant='small' color='blue-gray' className='font-normal'>
                                                        {content}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant='small' color='blue-gray' className='font-normal'>
                                                    {time.getFullYear()}/{('0' + (time.getMonth() + 1)).slice(-2)}/
                                                    {('0' + time.getDate()).slice(-2)}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <div className='flex justify-between items-center gap-4'>
                                                    <div className='col-4'>
                                                        {typ === 'warning' && <Warning />}
                                                        {typ === 'error' && <Error />}
                                                        {typ === 'success' && <Success />}
                                                        {typ === 'setting' && <Setting />}
                                                    </div>
                                                    <div className='col-4'>
                                                        {typ === 'warning' && (
                                                            <Typography variant='small' color='blue-gray' className='font-normal'>
                                                                Cảnh báo lỗi
                                                            </Typography>
                                                        )}
                                                        {typ === 'error' && (
                                                            <Typography variant='small' color='blue-gray' className='font-normal'>
                                                                Lỗi
                                                            </Typography>
                                                        )}
                                                        {typ === 'success' && (
                                                            <Typography variant='small' color='blue-gray' className='font-normal'>
                                                                Báo Cáo
                                                            </Typography>
                                                        )}
                                                        {typ === 'setting' && (
                                                            <Typography variant='small' color='blue-gray' className='font-normal'>
                                                                Cài đặt
                                                            </Typography>
                                                        )}
                                                    </div>
                                                    <div className='col-4'>
                                                        <ButtonInfo link={link} />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </CardBody>
                    <CardFooter className='flex items-center justify-between border-t border-blue-gray-50 p-4'>
                        <Typography variant='small' color='blue-gray' className='font-normal'>
                            Page {currentPage} of {Math.ceil(TABLE_ROWS.length / itemsPerPage)}
                        </Typography>
                        <div className='flex gap-2'>
                            <Button variant='outlined' size='sm' onClick={() => handlePreviousClick()}>
                                Previous
                            </Button>
                            <Button variant='outlined' size='sm' onClick={() => handleNextClick()}>
                                Next
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
