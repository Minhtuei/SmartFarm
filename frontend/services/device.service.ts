import axios from 'axios';
import { setHeaderRequest } from '@fe/utils';
import { useUserInfoStore } from '@fe/states';
export const DeviceService = {
    addDevice: async (deviceIDs: string) => {
        const { userData } = useUserInfoStore.getState();
        if (!userData) {
            return;
        }
        setHeaderRequest(sessionStorage.getItem('accessToken'), sessionStorage.getItem('refreshToken'));
        try {
            const response = await axios.patch(`http://localhost:8080/device/updateUser`, {
                userID: userData.id,
                deviceIDs
            });
            return response.data;
        } catch (error) {
            return error;
        }
    },
    getAllDevice: async (userId: string, limit: number) => {
        if (!sessionStorage.getItem('refreshToken')) {
            return;
        }
        setHeaderRequest(sessionStorage.getItem('accessToken'), sessionStorage.getItem('refreshToken'));
        try {
            const response = await axios.get(`http://localhost:8080/device/${userId}/${limit}`);

            return response.data;
        } catch (error) {
            await DeviceService.updateToken();
            return error;
        }
    },
    triggerDevice: async (state: DeviceState, deviceID: string) => {
        setHeaderRequest(sessionStorage.getItem('accessToken'), sessionStorage.getItem('refreshToken'));
        try {
            const response = await axios.patch(`http://localhost:8080/device/${deviceID}`, {
                deviceState: state,
                lastValue: state === 'ON' ? 1 : 0,
                updatedTime: new Date().toISOString()
            });

            return response.data;
        } catch (error) {
            return error;
        }
    },
    updateDeviceInfo: async (deviceID: string, type: string, data: DeviceUpdateInfo) => {
        try {
            setHeaderRequest(sessionStorage.getItem('accessToken'), sessionStorage.getItem('refreshToken'));
            let body = {};
            if (type === 'led' || type === 'waterpump') {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { minLimit, maxLimit, ...rest } = data;
                body = rest;
            } else {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { schedule, ...rest } = data;
                body = rest;
            }
            const response = await axios.patch(`http://localhost:8080/device/${deviceID}/updateInfo`, body);
            return response.data;
        } catch (error) {
            return error;
        }
    },
    updateToken: async () => {
        setHeaderRequest(sessionStorage.getItem('accessToken'), sessionStorage.getItem('refreshToken'));
        try {
            const response = await axios.post(`http://localhost:8080/login/updateToken`, {});
            if (response.data.accessToken) {
                sessionStorage.setItem('accessToken', response.data.accessToken);
            }
            return response.data;
        } catch (error) {
            sessionStorage.removeItem('refreshToken');
            return error;
        }
    },
    removeDeviceUser: async (deviceID: string) => {
        setHeaderRequest(sessionStorage.getItem('accessToken'), sessionStorage.getItem('refreshToken'));
        try {
            const response = await axios.patch(`http://localhost:8080/device/${deviceID}/removeUser`, {});
            return response.data;
        } catch (error) {
            return error;
        }
    },
    removeManyDevice: async (deviceIDs: string[]) => {
        setHeaderRequest(sessionStorage.getItem('accessToken'), sessionStorage.getItem('refreshToken'));
        try {
            const response = await axios.patch(`http://localhost:8080/device/removeManyDevice`, {
                deviceIDs
            });
            return response.data;
        } catch (error) {
            return error;
        }
    }
};
