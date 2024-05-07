export const filterDevice = (deviceType: string, deviceInfos: DeviceData[]) => {
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
