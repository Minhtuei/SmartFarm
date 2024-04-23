import { create } from 'zustand';
import { DeviceService } from '@fe/services';
export const useDevicesStore = create<DevicesInfo>((set) => ({
    deviceInfos: [],
    getDeviceInfos: async (userId: string) => {
        try {
            const data = await DeviceService.getAllDevice(userId);
            const deviceInfos = data.devices.map((device: DeviceData) => ({
                deviceName: device.deviceName,
                deviceState: device.deviceState,
                deviceType: device.deviceType,
                userID: device.userID,
                schedule: device.schedule,
                color: device.color,
                minLimit: device.minLimit,
                maxLimit: device.maxLimit,
                lastValue: device.lastValue,
                updatedTime: device.updatedTime,
                environmentValue: device.environmentValue,
                adaFruitID: device.adaFruitID
            }));
            set({ deviceInfos });
        } catch (err) {
            DeviceService.updateToken();
            console.log(err);
        }
    }
}));
