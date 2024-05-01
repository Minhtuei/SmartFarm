import { NOTIFICATION_CATEGORY } from '@fe/constants';
import { useNotificationStore } from '@fe/states';
import { BellIcon, ClockIcon } from '@heroicons/react/20/solid';
import { IconButton, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react';
import moment from 'moment';
import { Link } from 'react-router-dom';
export function NotificationsMenu() {
    const { notifications } = useNotificationStore();

    return (
        <Menu>
            <MenuHandler>
                <IconButton placeholder={''} variant='text'>
                    <BellIcon className='w-6 h-6 dark:text-white' />
                </IconButton>
            </MenuHandler>
            <MenuList placeholder={''} className='flex flex-col gap-2'>
                {notifications.slice(0, 3).map((notification, index) => (
                    <MenuItem key={index} placeholder={''} className='flex items-center gap-4 py-2 pl-2 pr-8'>
                        {NOTIFICATION_CATEGORY[notification.notificationType].icon}
                        <div className='flex flex-col gap-1'>
                            <Typography placeholder={''} variant='small' color='gray' className='font-semibold'>
                                {notification.context}
                            </Typography>
                            <Typography placeholder={''} className='flex items-center gap-1 text-sm font-medium text-blue-gray-500'>
                                <ClockIcon className='w-4 h-4' />
                                {moment(notification.createdAt).fromNow()}
                            </Typography>
                        </div>
                    </MenuItem>
                ))}
                <MenuItem placeholder={''} className='flex items-center justify-center py-2'>
                    <Link to='/notification' className='text-blue-500 font-semibold'>
                        Xem tất cả thông báo
                    </Link>
                </MenuItem>
            </MenuList>
        </Menu>
    );
}
