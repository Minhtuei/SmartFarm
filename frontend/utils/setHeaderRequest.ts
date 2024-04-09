import axios from 'axios';

export const setHeaderRequest = (accessToken: string | null, refreshToken: string | null) => {
    if (accessToken && refreshToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        axios.defaults.headers.common['Refresh-Token'] = `Bearer ${refreshToken}`;
    } else if (accessToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        delete axios.defaults.headers.common['Refresh-Token'];
    } else {
        delete axios.defaults.headers.common['Authorization'];
        delete axios.defaults.headers.common['Refresh-Token'];
    }
};
