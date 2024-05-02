import { Notification } from '@be/models';

interface NotificationData {
    context: string;
    notificationType: string;
    email: string | undefined;
    deviceName: string;
}
class NotificationFactory {
    static async createNotification({ context, notificationType, email, deviceName }: NotificationData) {
        const notification = new Notification({
            context,
            notificationType,
            email,
            deviceName
        });
        await notification.save();
    }
    static async createErrorNotification({ context, email, deviceName }: Omit<NotificationData, 'notificationType'>) {
        await NotificationFactory.createNotification({ context, notificationType: 'error', email, deviceName });
    }
    static async createSuccessNotification({ context, email, deviceName }: Omit<NotificationData, 'notificationType'>) {
        await NotificationFactory.createNotification({ context, notificationType: 'success', email, deviceName });
    }
    static async createWarningNotification({ context, email, deviceName }: Omit<NotificationData, 'notificationType'>) {
        await NotificationFactory.createNotification({ context, notificationType: 'warning', email, deviceName });
    }
    static async createInfoNotification({ context, email, deviceName }: Omit<NotificationData, 'notificationType'>) {
        await NotificationFactory.createNotification({ context, notificationType: 'info', email, deviceName });
    }
}
export default NotificationFactory;
