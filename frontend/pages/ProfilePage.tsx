import { AppNavigationBar } from '@fe/components';
import { Avatar, Button } from '@material-tailwind/react';
import { AiTwotoneMail } from 'react-icons/ai';
import { IoIosPhonePortrait } from 'react-icons/io';
import { FaKey, FaEye } from 'react-icons/fa';
import { useState } from 'react';
import { validatePassword } from '@fe/utils';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
export function ProfilePage() {
    const clsDefaultInput =
        'peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50';
    const [username, setUsername] = useState<string>('Nguyễn Minh Toàn');
    const email = 'test1@test.test';
    const [phone, setPhone] = useState<string>('0392123451');
    const password = 'test123@';
    const [newPassword, setNewPassword] = useState<string>('');
    const [verPassword, setVerPassword] = useState<string>('');
    const [hide1, setHide1] = useState<boolean>(true);
    const [hide2, setHide2] = useState<boolean>(true);
    const [hide3, setHide3] = useState<boolean>(true);
    const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };
    const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    };
    const handleClick1 = () => {
        setHide1(!hide1);
    };
    const handleClick2 = () => {
        setHide2(!hide2);
    };
    const handleClick3 = () => {
        setHide3(!hide3);
    };

    const handlePass2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    };
    const handlePass3 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVerPassword(e.target.value);
    };
    const Save = () => {
        console.log('Saving...');
        if (newPassword !== verPassword) {
            enqueueSnackbar('The new password does not match the retype password', { variant: 'error', autoHideDuration: 2000 });
        } else if (!validatePassword(newPassword) || !validatePassword(verPassword)) {
            enqueueSnackbar(
                'The new password must be at least 8 characters long and contain at least one letter, one number, and one special character.',
                { variant: 'error', autoHideDuration: 2000 }
            );
        }
        // send server -> dont complete
    };
    return (
        <>
            <AppNavigationBar title='Profile' />
            <SnackbarProvider />
            <div className='p-4 bg-white/2 h-full'>
                <div className='w-[max-content]'>
                    <p className='font-semibold text-xl'>Thông tin</p>
                    <div className='w-full border-b border-gray-500'></div>
                </div>
                <div className='w-[80%] mt-4 ml-3 flex flex-row justify-between items-center p-3'>
                    <div className='flex flex-row gap-2'>
                        <div>
                            <Avatar size='xl' src='https://docs.material-tailwind.com/img/face-2.jpg' alt='avatar' />
                        </div>
                        <div>
                            <p>Minh Toàn</p>
                            <p>Software Enginneer</p>
                            <p>Đại Học Bách Khoa, TP.HCM</p>
                        </div>
                    </div>
                    <div className='space-x-2'>
                        <Button className='bg-[#4AB58E] border-[1px] border-black'>Tải ảnh</Button>
                        <Button className='bg-[#fff] text-[$000] border-[1px] border-black'>Xóa ảnh</Button>
                    </div>
                </div>
                <div className='w-full border-b border-gray-500'></div>
                <div>
                    <p className='font-semibold text-lg my-3 ml-3'>Họ và tên</p>
                    <div className='w-[90%] ml-3'>
                        <input type='text' value={username} className={clsDefaultInput} onChange={(e) => handleUserName(e)} />
                    </div>
                    <div className='w-[90%] flex flex-row justify-between'>
                        <div className='w-[47%]'>
                            <p className='font-semibold text-lg my-3 ml-3'>Địa chỉ Email</p>
                            <div className='w-full ml-3'>
                                <div style={{ position: 'relative' }}>
                                    <AiTwotoneMail
                                        style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)' }}
                                    />
                                    <input
                                        type='email'
                                        style={{ paddingLeft: '30px' }}
                                        className={clsDefaultInput}
                                        value={email}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='w-[47%]'>
                            <p className='font-semibold text-lg my-3 ml-3'>Số điện thoại</p>
                            <div className='w-full ml-3'>
                                <div style={{ position: 'relative' }}>
                                    <IoIosPhonePortrait
                                        style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)' }}
                                    />
                                    <input
                                        type='number'
                                        style={{ paddingLeft: '30px' }}
                                        className={clsDefaultInput}
                                        value={phone}
                                        onChange={(e) => handlePhone(e)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-[90%] flex flex-row justify-between'>
                        <div className='w-[47%]'>
                            <p className='font-semibold text-lg my-3 ml-3'>Mật khẩu hiện tại</p>
                            <div className='w-full ml-3'>
                                <div style={{ position: 'relative' }}>
                                    <FaKey style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)' }} />
                                    <FaEye
                                        className='absolute top-1/2 right-5 transform -translate-y-1/2 hover:text-[#546e7a] active:text-[#9e9e9e]'
                                        onClick={() => handleClick1()}
                                    />
                                    <input
                                        type={hide1 ? 'password' : 'text'}
                                        style={{ paddingLeft: '30px' }}
                                        className={clsDefaultInput}
                                        value={password}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='w-[47%]'>
                            <p className='font-semibold text-lg my-3 ml-3'>Mật khẩu mới</p>
                            <div className='w-full ml-3'>
                                <div style={{ position: 'relative' }}>
                                    <FaKey style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)' }} />
                                    <FaEye
                                        className='absolute top-1/2 right-5 transform -translate-y-1/2 hover:text-[#546e7a] active:text-[#9e9e9e]'
                                        onClick={() => handleClick2()}
                                    />
                                    <input
                                        type={hide2 ? 'password' : 'text'}
                                        style={{ paddingLeft: '30px' }}
                                        className={clsDefaultInput}
                                        value={newPassword}
                                        onChange={(e) => handlePass2(e)}
                                        placeholder='nhập vào mật khẩu mới'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p className='font-semibold text-lg my-3 ml-3'>Nhập lại mật khẩu mới</p>
                <div className='w-[90%] ml-3'>
                    <div style={{ position: 'relative' }}>
                        <FaKey style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)' }} />
                        <FaEye
                            className='absolute top-1/2 right-5 transform -translate-y-1/2 hover:text-[#546e7a] active:text-[#9e9e9e]'
                            onClick={() => handleClick3()}
                        />
                        <input
                            type={hide3 ? 'password' : 'text'}
                            style={{ paddingLeft: '30px' }}
                            className={clsDefaultInput}
                            value={verPassword}
                            onChange={(e) => handlePass3(e)}
                            placeholder='Nhập lại mật khâu mới tại đây'
                        />
                    </div>
                </div>
                <div className='w-[90%] space-x-2 mt-3 flex justify-end'>
                    <Button
                        className='bg-[#fff] text-[$000] border-[1px] border-black'
                        onClick={() => {
                            window.location = '/profile';
                        }}
                    >
                        Hủy bỏ
                    </Button>
                    <Button className='bg-[#4AB58E] border-[1px] border-black' onClick={() => Save()}>
                        Lưu
                    </Button>
                </div>
            </div>
        </>
    );
}
