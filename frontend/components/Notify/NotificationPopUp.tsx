import { Typography, Alert } from '@material-tailwind/react';
import { NOTIFICATION_CATEGORY } from '@fe/constants';
import { useNotificationStore } from '@fe/states';
import { useEffect, useState } from 'react';
export const NotificationPopUp = () => {
    const [isShow, setIsShow] = useState<boolean>(false);
    const { notifications, haveNotification, newNotificationLength } = useNotificationStore();
    const [newNotifications, setNewNotifications] = useState(notifications.slice(0, newNotificationLength) || null);

    useEffect(() => {
        if (haveNotification) {
            setNewNotifications(notifications.slice(0, newNotificationLength));
            setIsShow(true);
            setTimeout(() => {
                setIsShow(false);
                useNotificationStore.getState().haveNotification = false;
            }, 3000);
        }
    }, [haveNotification]);
    if (!notifications) {
        return null;
    }
    return (
        <div className='flex flex-col gap-y-2 w-80'>
            {newNotifications.map((notification: NotificationInfo, index) => (
                <Alert
                    key={index}
                    className='w-80'
                    style={{ backgroundColor: NOTIFICATION_CATEGORY[notification.notificationType].color }}
                    open={isShow}
                >
                    <Typography color='white' className='font-bold text-sm'>
                        {NOTIFICATION_CATEGORY[notification.notificationType].label}
                    </Typography>
                    <Typography color='white' className='text-sm leading-3 truncate'>
                        {notification.context}
                    </Typography>
                </Alert>
            ))}
        </div>
    );
};
