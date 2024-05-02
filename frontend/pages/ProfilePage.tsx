import { AppNavigationBar } from '@fe/components';
import { Avatar, Button } from '@material-tailwind/react';
import { AiTwotoneMail } from 'react-icons/ai';
import { IoIosPhonePortrait } from 'react-icons/io';
import { FaKey, FaEye } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { validatePassword } from '@fe/utils';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import { MdKeyboardVoice, MdVoiceOverOff } from 'react-icons/md';
import axios from 'axios';
import { HttpStatusCode } from 'axios';
export function ProfilePage() {
    const clsDefaultInput =
        'peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50';
    const [username, setUsername] = useState<string>('Nguyễn Minh Toàn');
    const [voice, setVoice] = useState<boolean>(true); // change this when implement backend.
    const [email, setEmail] = useState<string>('test');
    const [phone, setPhone] = useState<string>('0392123451');
    const [newPassword, setNewPassword] = useState<string>('');
    const [verPassword, setVerPassword] = useState<string>('');
    const [hide2, setHide2] = useState<boolean>(true);
    const [hide3, setHide3] = useState<boolean>(true);
    const serverHost = 'http://localhost:8080';
    useEffect(() => {
        axios({
            method: 'GET',
            headers: {
                Authorization: `Bearer ${sessionStorage.accessToken}`,
                'Refresh-Token': `Bearer ${sessionStorage.refreshToken}`
            },
            url: `${serverHost}/user`,
            responseType: 'json'
        })
            .then(function (response) {
                if (response.status === HttpStatusCode.Ok) {
                    setEmail(response.data.user.email);
                    setUsername(response.data.user.name);
                    setPhone(response.data.user.phoneNumber);
                }
            })
            .catch(function (error) {
                // console.error(error);
                if (
                    error.response.status === HttpStatusCode.BadRequest ||
                    error.response.status === HttpStatusCode.Unauthorized ||
                    error.response.status === HttpStatusCode.InternalServerError
                ) {
                    enqueueSnackbar(`${error.response.data.message}`, { variant: 'error', autoHideDuration: 3000 });
                }
                console.log(error);
            });
    }, []);
    const handleVoice = () => {
        setVoice(!voice);
        enqueueSnackbar('Nhấn Lưu để lưu lại trạng thái', { variant: 'warning', autoHideDuration: 2000 });
    };
    const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };
    const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
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
        if (newPassword !== '' && newPassword !== verPassword) {
            enqueueSnackbar('Mật khẩu không trùng khớp', { variant: 'error', autoHideDuration: 2000 });
        } else if (newPassword !== '' && (!validatePassword(newPassword) || !validatePassword(verPassword))) {
            enqueueSnackbar('Mật khẩu phải gồm ít nhất 8 ký tự gồm chữ cái, số và ít nhất 1 ký tự đặc biệt.', {
                variant: 'error',
                autoHideDuration: 2000
            });
        } else {
            let data;
            if (verPassword !== '') {
                data = {
                    name: username,
                    password: verPassword,
                    phoneNumber: phone,
                    voice: voice
                };
            } else {
                data = {
                    name: username,
                    phoneNumber: phone,
                    voice: voice
                };
            }
            axios({
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${sessionStorage.accessToken}`,
                    'Refresh-Token': `Bearer ${sessionStorage.refreshToken}`
                },
                url: `${serverHost}/user`,
                data: data,
                responseType: 'json'
            })
                .then(function (response) {
                    if (response.status === HttpStatusCode.Ok) {
                        console.log(response);
                        enqueueSnackbar(`Lưu thành công!`, { variant: 'success', autoHideDuration: 2000 });
                    }
                })
                .catch(function (error) {
                    // console.error(error);
                    if (
                        error.response.status === HttpStatusCode.BadRequest ||
                        error.response.status === HttpStatusCode.Unauthorized ||
                        error.response.status === HttpStatusCode.InternalServerError
                    ) {
                        enqueueSnackbar(`${error.response.data.message}`, { variant: 'error', autoHideDuration: 3000 });
                    }
                    console.log(error);
                });
        }
        // send server -> dont complete
    };
    return (
        <>
            <AppNavigationBar title='Profile' />
            <SnackbarProvider />
            <div className='p-4 bg-white/2 h-screen'>
                <div className='w-[max-content]'>
                    <p className='font-semibold text-xl'>Thông tin</p>
                    <div className='w-full border-b border-gray-500'></div>
                </div>
                <div className='w-[80%] my-4 ml-3 md:flex md:flex-row justify-between items-center p-3 relative'>
                    <div className='flex flex-row gap-2'>
                        <div>
                            <Avatar
                                size='xl'
                                src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'
                                alt='avatar'
                            />
                        </div>
                        <div>
                            <p>{username}</p>
                            <p>Software Enginneer</p>
                            <p>Đại Học Bách Khoa, TP.HCM</p>
                        </div>
                    </div>
                    <div
                        className={`md:absolute md:right-0 border-2 border-black p-2 rounded-xl text-white font-bold shadow-md ${
                            voice ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                        }`}
                        onClick={handleVoice}
                    >
                        <p className='text-center text-[#1d1d1d]'>
                            Điều kiển bằng <br />
                            giọng nói
                        </p>
                        {voice ? (
                            <MdKeyboardVoice className='mx-auto text-xl font-bold ' />
                        ) : (
                            <MdVoiceOverOff className='mx-auto text-xl font-bold ' />
                        )}
                        <p className={`text-center ${voice ? 'text-[#0f172a]' : ''}`}>{voice ? 'Đang bật' : 'Đang tắt'}</p>
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
                                        onChange={(e) => handlePass2(e)}
                                        value={newPassword}
                                        placeholder='Nhập mật khẩu mới hoặc để trống!'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='w-[47%]'>
                            <p className='font-semibold text-lg my-3 ml-3'>Nhập lại mật khẩu</p>
                            <div className='w-full ml-3'>
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
                                        placeholder='nhập vào mật khẩu mới'
                                    />
                                </div>
                            </div>
                        </div>
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
