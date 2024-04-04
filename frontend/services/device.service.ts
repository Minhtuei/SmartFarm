import axios from 'axios';

export const DeviceService = {
    addDevice: async (deviceID: string) => {
        try {
            const response = await axios.patch(`http://localhost:8080/device/${deviceID}`, {});
            return response.data;
        } catch (error) {
            return error;
        }
    },
    getAllDevice: async () => {
        try {
            const response = await axios.get(`http://localhost:8080/device/getall`);
            return response.data;
        } catch (error) {
            return error;
        }
    }
};
