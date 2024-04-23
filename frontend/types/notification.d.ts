type NotificationType = 'success' | 'error' | 'schedule' | 'warning';
interface NotificationInfo {
    _id: string;
    context: string;
    notificationType: NotificationType;
    email: string;
    deviceName: string;
    createdTime: string;
}
interface NotificationInfos {
    notifications: NotificationInfo[];
    getNotifications: (userId: string) => Promise<void>;
}
