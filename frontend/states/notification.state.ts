import { create } from 'zustand';
import { NotificationService } from '@fe/services';
export const useNotificationStore = create<NotificationInfos>((set, get) => ({
    notifications: [],
    haveNotification: false,
    newNotificationLength: 0,
    getNotifications: async (userId: string) => {
        try {
            const data = await NotificationService.getAllNotification(userId);
            const notifications = data.notifications.map((notification: NotificationInfo) => ({
                _id: notification._id,
                context: notification.context,
                notificationType: notification.notificationType,
                email: notification.email,
                deviceName: notification.deviceName,
                createdAt: notification.createdAt
            }));
            set({ notifications });
        } catch (err) {
            NotificationService.updateToken();
            console.log(err);
        }
    },
    getLatestNotification: async (userId: string) => {
        try {
            const data = await NotificationService.getLatestNotification(userId);
            const newNotifications = data.notification;
            const existingNotifications = get().notifications;
            if (!newNotifications) {
                set({ haveNotification: false });
                set({ newNotificationLength: 0 });
                return;
            }
            const uniqueNewNotifications = newNotifications.filter(
                (newNotification: NotificationInfo) =>
                    !existingNotifications.some((existingNotification) => existingNotification._id === newNotification._id)
            );
            if (uniqueNewNotifications.length > 0) {
                set({ notifications: [...uniqueNewNotifications, ...existingNotifications] });
                set({ haveNotification: true });
                set({ newNotificationLength: uniqueNewNotifications.length });
            } else {
                set({ haveNotification: false });
                set({ newNotificationLength: 0 });
            }
        } catch (error) {
            console.error('Error getting latest notification:', error);
        }
    }
}));
