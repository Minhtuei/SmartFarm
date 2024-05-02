import { Warning, Error, Success, Setting } from '@fe/components';
export const NOTIFICATION_CATEGORY = {
    success: {
        label: 'Thành công',
        color: 'green',
        icon: <Success />,
        description:
            'Thông báo về các hành động thành công. Ví dụ: thêm thiết bị thành công, cập nhật thông tin thành công, bật/tắt thiết bị thành công.'
    },
    schedule: {
        label: 'Thông tin',
        color: 'gray',
        icon: <Setting />,
        description: 'Thông báo về các lịch trình đã được tạo. Ví dụ: lịch trình bật/tắt thiết bị.'
    },
    warning: {
        label: 'Cảnh báo',
        color: 'orange',
        icon: <Warning />,
        description: 'Thông báo về các cảnh báo. Ví dụ: thiết bị ghi nhận giá trị ngoài ngưỡng, thiết bị không hoạt động theo lịch trình.'
    },
    error: {
        label: 'Lỗi',
        color: 'red',
        icon: <Error />,
        description: 'Thông báo về các lỗi. Ví dụ: thêm thiết bị thất bại, cập nhật thông tin thất bại, bật/tắt thiết bị thất bại.'
    }
};
