type NotificationType = 'success' | 'error' | 'schedule' | 'warning';
interface NotificationInfo {
    _id: string;
    context: string;
    notificationType: NotificationType;
    email: string;
    deviceName: string;
    createdAt: string;
}
interface NotificationInfos {
    notifications: NotificationInfo[];
    haveNotification: boolean;
    getNotifications: (userId: string) => Promise<void>;
    getLatestNotification: (userId: string) => Promise<void>;
    newNotificationLength: number;
}
