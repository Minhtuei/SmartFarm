import axios from 'axios';
import { setHeaderRequest } from '@fe/utils';
export const DeviceService = {
    addDevice: async (deviceID: string) => {
        setHeaderRequest(sessionStorage.getItem('accessToken'), sessionStorage.getItem('refreshToken'));
        try {
            const response = await axios.patch(`http://localhost:8080/device/${deviceID}`, {});
            await DeviceService.getAllDevice();
            return response.data;
        } catch (error) {
            return error;
        }
    },
    getAllDevice: async () => {
        setHeaderRequest(sessionStorage.getItem('accessToken'), sessionStorage.getItem('refreshToken'));
        try {
            const response = await axios.get(`http://localhost:8080/device/getall`);
            return response.data;
        } catch (error) {
            DeviceService.updateToken();
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
    updateToken: async () => {
        setHeaderRequest(sessionStorage.getItem('accessToken'), sessionStorage.getItem('refreshToken'));
        try {
            const response = await axios.post(`http://localhost:8080/login/updateToken`, {});
            sessionStorage.setItem('accessToken', response.data.accessToken);
        } catch (error) {
            return error;
        }
    }
};
