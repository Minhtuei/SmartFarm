import { Warning, Error, Success, Setting } from '@fe/components';
export const NOTIFICATION_CATEGORY = {
    success: {
        label: 'Thành công',
        color: 'green',
        icon: <Success />
    },
    schedule: {
        label: 'Thông tin',
        color: 'gray',
        icon: <Setting />
    },
    warning: {
        label: 'Cảnh báo',
        color: 'orange',

        icon: <Warning />
    },
    error: {
        label: 'Lỗi',
        color: 'red',
        icon: <Error />
    }
};
