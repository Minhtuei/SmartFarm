import { Warning, Error, Success, Setting } from '@fe/components';
export const NOTIFICATION_CATEGORY = {
    success: {
        label: 'Thành công',
        color: 'green',
        icon: <Success />
    },
    error: {
        label: 'Lỗi',
        color: 'red',
        icon: <Error />
    },
    schedule: {
        label: 'Thông tin',
        color: 'blue',
        icon: <Setting />
    },
    warning: {
        label: 'Cảnh báo',
        color: 'rgb(254 249 195)',

        icon: <Warning />
    }
};
