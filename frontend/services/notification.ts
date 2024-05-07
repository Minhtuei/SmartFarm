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
        if (!sessionStorage.getItem('refreshToken')) {
            return;
        }
        setHeaderRequest(sessionStorage.getItem('accessToken'), sessionStorage.getItem('refreshToken'));
        try {
            const response = await axios.get(`http://localhost:8080/notification/${userId}/latest`);
            return response.data;
        } catch (error) {
            if (error.response.status === 401) {
                await NotificationService.updateToken();
            } else if (error.response.status === 403) {
                sessionStorage.removeItem('refreshToken');
            }
            return error;
        }
    },
    updateToken: async () => {
        if (!sessionStorage.getItem('refreshToken')) {
            return;
        }
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
    }
};
