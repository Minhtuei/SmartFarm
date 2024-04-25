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
