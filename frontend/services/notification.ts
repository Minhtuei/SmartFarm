import axios from 'axios';
import { setHeaderRequest } from '@fe/utils';
export const NotificationService = {
    getAllNotification: async (userId: string) => {
        setHeaderRequest(sessionStorage.getItem('accessToken'), sessionStorage.getItem('refreshToken'));
        try {
            const response = await axios.get(`http://localhost:8080/notification/${userId}`);
            return response.data;
        } catch (error) {
            NotificationService.updateToken();
            return error;
        }
    },
    getLatestNotification: async (userId: string) => {
        setHeaderRequest(sessionStorage.getItem('accessToken'), sessionStorage.getItem('refreshToken'));
        try {
            const response = await axios.get(`http://localhost:8080/notification/${userId}/latest`);
            return response.data;
        } catch (error) {
            NotificationService.updateToken();
            return error;
        }
    },
    updateToken: async () => {
        setHeaderRequest(sessionStorage.getItem('accessToken'), sessionStorage.getItem('refreshToken'));
        try {
            const response = await axios.post(`http://localhost:8080/login/updateToken`, {});
            return response.data;
        } catch (error) {
            return error;
        }
    }
};
