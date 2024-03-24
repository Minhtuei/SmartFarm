import axios from 'axios';
export const dashboardService = {
    getDashboard: async () => {
        try {
            const response = await axios.get('https://io.adafruit.com/api/v2/manhtrannnnnn/feeds');
            return response.data;
        } catch (error) {
            return error;
        }
    }
};
