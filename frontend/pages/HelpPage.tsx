import { AppNavigationBar } from '@fe/components';
import { Typography } from '@material-tailwind/react';
import sheduleImg from '@fe/assets/help/shedule.png';
import addDeviceImg from '@fe/assets/help/addDevice.png';
import removeDevceImg from '@fe/assets/help/removeDevice.png';
import notificationImg from '@fe/assets/help/notification.png';
import profileImg from '@fe/assets/help/profile.png';
import { NOTIFICATION_CATEGORY } from '@fe/constants';
export function HelpPage() {
    return (
        <>
            <AppNavigationBar title='Trợ giúp' />
            <div className='p-4 bg-white/2 overflow-auto'>
                <Typography variant='h4' className='mb-4'>
                    1. Làm thế nào để thêm thiết bị mới?
                </Typography>
                <Typography className='mb-4'>
                    Để thêm thiết bị mới, bạn cần truy cập vào trang thiết bị, sau đó chọn nút "Thêm thiết bị" và nhập mã thiết bị của bạn.
                    Lưu ý rằng mã thiết bị phải là một chuỗi 7 chữ số. Bạn cũng có thể thêm nhiều thiết bị cùng lúc bằng cách nhập mã thiết
                    bị cách nhau bởi dấu phẩy.
                </Typography>
                <img src={addDeviceImg} alt='addDevice' className='w-1/3 object-cover object-center mx-auto mb-4 rounded-lg' />
                <Typography variant='h4' className='mb-4'>
                    2. Làm thế nào để xoá thiết bị?
                </Typography>
                <Typography className='mb-4'>
                    Để xoá thiết bị, bạn cần truy cập vào trang thiết bị, sau đó chọn thiết bị cần xoá và chọn nút "Xoá thiết bị". Lưu ý
                    rằng bạn có thể xoá nhiều thiết bị cùng lúc bằng cách chọn nhiều thiết bị và chọn nút màu đỏ.
                </Typography>
                <img src={removeDevceImg} alt='removeDevice' className='w-1/3 object-cover object-center mx-auto mb-4 rounded-lg' />
                <Typography variant='h4' className='mb-4'>
                    3. Làm thế nào để thay đổi thông tin thiết bị?
                </Typography>
                <Typography className='mb-4'>
                    Để thay đổi thông tin thiết bị, bạn cần truy cập vào trang thiết bị, sau đó chọn thiết bị cần thay đổi thông tin và chọn
                    nút "Chỉnh sửa". Bạn có thể thay đổi tên thiết bị, ngưỡng trên, ngưỡng dưới, màu đèn và lập lịch bật/tắt thiết bị.
                </Typography>
                <img src={sheduleImg} alt='shedule' className='w-1/3 object-cover object-center mx-auto mb-4 rounded-lg' />
                <Typography variant='h4' className='mb-4'>
                    4. Làm thế nào để thay đổi thông tin cá nhân?
                </Typography>
                <Typography className='mb-4'>
                    Để thay đổi thông tin tài khoản, bạn cần truy cập vào trang cá nhân. Tại đây, bạn có thể thay đổi tên số điện thoại, và
                    mật khẩu.
                </Typography>
                <img src={profileImg} alt='profile' className='w-1/3 object-cover object-center mx-auto mb-4 rounded-lg' />
                <Typography variant='h4' className='mb-4'>
                    5. Các loại thông báo nào mà tôi có thể nhận được?
                </Typography>
                <div className=''>
                    {Object.keys(NOTIFICATION_CATEGORY).map((category) => (
                        <div key={category} className='flex items-start gap-4 mb-4'>
                            <div className='basis-1/6 flex items-center gap-2'>
                                {NOTIFICATION_CATEGORY[category as keyof typeof NOTIFICATION_CATEGORY].icon}
                                <Typography color='blue-gray' className='font-normal'>
                                    {NOTIFICATION_CATEGORY[category as keyof typeof NOTIFICATION_CATEGORY].label}:{' '}
                                </Typography>
                            </div>
                            <div className='basis-5/6'>
                                <Typography color='blue-gray' className='font-normal'>
                                    {NOTIFICATION_CATEGORY[category as keyof typeof NOTIFICATION_CATEGORY].description}
                                </Typography>
                            </div>
                        </div>
                    ))}
                </div>
                <Typography variant='h4' className='mb-4'>
                    6. Làm thế nào để xem lịch sử thông báo?
                </Typography>
                <Typography className='mb-4'>
                    Để xem lịch sử thông báo, bạn cần truy cập vào trang thông báo. Tại đây, bạn có thể xem tất cả thông báo đã nhận được
                    trong 30 ngày qua. Bạn cũng có thể phân loại thông báo theo loại thông báo, tìm kiếm thông báo theo tên thiết bị.
                </Typography>
                <img src={notificationImg} alt='notification' className='w-1/3 object-cover object-center mx-auto mb-4 rounded-lg' />
                <Typography variant='h4' className='mb-4'>
                    7. Thứ tự ưu tiên của các thao tác bật/tắt thiết bị là gì?
                </Typography>
                <Typography className='mb-4'>
                    Khi bạn thực hiện nhiều thao tác bật/tắt thiết bị cùng một lúc, hệ thống sẽ ưu tiên thực hiện thao tác bật thiết bị theo
                    thứ tự sau:
                </Typography>
                <div className='ml-8'>
                    <Typography className='mb-2'>1. Thao tác bật thiết bị tự động theo ngưỡng.</Typography>
                    <Typography className='mb-2'>2. Thao tác bật thiết bị thủ công theo người dùng.</Typography>
                    <Typography className='mb-2'>3. Thao tác tắt thiết bị tự động theo lịch trình.</Typography>
                </div>
            </div>
        </>
    );
}
