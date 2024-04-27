export const filterDeviceByType = (deviceType: string, deviceInfos: DeviceData[]) => {
    deviceInfos.forEach((device) => {
        if (deviceType === 'all') {
            document.getElementById(device.adaFruitID)?.classList.remove('hidden');
        } else if (device.deviceType === deviceType) {
            document.getElementById(device.adaFruitID)?.classList.remove('hidden');
        } else {
            document.getElementById(device.adaFruitID)?.classList.add('hidden');
        }
    });
};
export const filterDeviceByName = (deviceName: string, deviceInfos: DeviceData[]) => {
    deviceInfos.forEach((device) => {
        if (deviceName === 'all') {
            document.getElementById(device.adaFruitID)?.classList.remove('hidden');
        } else if (device.deviceName.includes(deviceName)) {
            document.getElementById(device.adaFruitID)?.classList.remove('hidden');
        } else {
            document.getElementById(device.adaFruitID)?.classList.add('hidden');
        }
    });
};

export const filterNotificationByType = (notificationType: string, notificationInfos: NotificationInfo[]) => {
    notificationInfos.forEach((notification) => {
        if (notificationType === 'all') {
            document.getElementById(notification._id)?.classList.remove('hidden');
        } else if (notification.notificationType === notificationType) {
            document.getElementById(notification._id)?.classList.remove('hidden');
        } else {
            document.getElementById(notification._id)?.classList.add('hidden');
        }
    });
};
export const filterNotificationByDeviceName = (deviceName: string, notificationInfos: NotificationInfo[]) => {
    notificationInfos.forEach((notification) => {
        if (deviceName === 'all') {
            document.getElementById(notification._id)?.classList.remove('hidden');
        } else if (notification.deviceName.includes(deviceName)) {
            document.getElementById(notification._id)?.classList.remove('hidden');
        } else {
            document.getElementById(notification._id)?.classList.add('hidden');
        }
    });
};
