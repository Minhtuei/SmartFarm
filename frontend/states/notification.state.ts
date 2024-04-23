import { create } from 'zustand';
import { NotificationService } from '@fe/services';
export const useNotificationStore = create<NotificationInfos>((set) => ({
    notifications: [],
    getNotifications: async (userId: string) => {
        try {
            const data = await NotificationService.getAllNotification(userId);
            const notifications = data.notifications.map((notification: NotificationInfo) => ({
                _id: notification._id,
                context: notification.context,
                notificationType: notification.notificationType,
                email: notification.email,
                deviceName: notification.deviceName,
                createdTime: notification.createdTime
            }));
            set({ notifications });
        } catch (err) {
            NotificationService.updateToken();
            console.log(err);
        }
    }
}));
