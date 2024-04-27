import { CardHeader, CardBody, CardFooter, Typography, Input, Checkbox, Button } from '@material-tailwind/react';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { validateEmail, validatePassword } from '@fe/utils';
import { useUserInfoStore } from '@fe/states';
import { HttpStatusCode } from 'axios';
import { setHeaderRequest } from '@fe/utils';
import axios from 'axios';
import { Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
export function LoginPage() {
    const [message, setMessage] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [block, setBlock] = useState<boolean>(false);
    const { setUserData, setIsAuth } = useUserInfoStore();
    const serverHost = 'http://localhost:8080';
    const [open, setOpen] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(false);
    const [sendOtp, setSendOtp] = useState<boolean>(false);
    const [openValid, setOpenValid] = useState<boolean>(false);
    const [emailValid, setEmailValid] = useState<string>('');
    const [inputValid, setInputValid] = useState<string>('');
    const [inputRecheck, setInputRecheck] = useState<string>('');
    const [otp, setOtp] = useState<number | undefined>(undefined);
    const [messageValid, setMessageValid] = useState<string>('');
    const [validMessage, setValidMessage] = useState<boolean>(false);
    const [errorColor, setErrorColor] = useState<boolean>();
    const resendOtp = () => {
        setBlock(true);
        if (!validateEmail(emailValid)) {
            setErrorColor(true);
            setValidMessage(true);
            setMessageValid('Bạn chưa điền email hoặc email không đúng định dạng, làm ơn nhập đúng email');
        } else {
            setValidMessage(true);
            setMessageValid('Đang xử lý');
            axios({
                method: 'POST',
                url: `${serverHost}/gen/otp/${emailValid}`,
                responseType: 'json'
            })
                .then(function (res) {
                    setErrorColor(false);
                    setValidMessage(true);
                    setMessageValid('Chúng tôi đã gửi OTP mới vào email của bạn vui lòng kiểm tra lại');
                    console.log(res);
                })
                .catch(function (error) {
                    setValidMessage(true);
                    setMessageValid(error.response.data.message);
                });
        }
        setTimeout(function () {
            setValidMessage(false);
            setMessageValid('');
            setBlock(false);
        }, 3000);
    };
    const handleSubmitValid = () => {
        setBlock(true);
        if (!validateEmail(emailValid)) {
            setErrorColor(true);
            setValidMessage(true);
            setBlock(false);
            setMessageValid('Mail không đúng định dạng, làm ơn nhập đúng email');
        } else if (inputValid !== inputRecheck) {
            setErrorColor(true);
            setValidMessage(true);
            setBlock(false);
            setMessageValid('Mật khẩu nhập lại không trùng khớp');
        } else if (!validatePassword(inputValid)) {
            setErrorColor(true);
            setValidMessage(true);
            setBlock(false);
            setMessageValid('Password phải ít nhất 8 ký tự gồm chữ cái, số và ít nhất 1 ký tự đặc biệt');
        } else {
            setMessageValid('Đang xử lý');
            axios({
                method: 'POST',
                url: `${serverHost}/reset`,
                responseType: 'json',
                data: {
                    email: emailValid,
                    password: inputValid,
                    otp: otp
                }
            })
                .then(function (res) {
                    setErrorColor(false);
                    setValidMessage(true);
                    setMessageValid(res.data.message);
                })
                .catch(function (error) {
                    if (
                        error.response.status === HttpStatusCode.BadRequest ||
                        error.response.status === HttpStatusCode.Unauthorized ||
                        error.response.status === HttpStatusCode.InternalServerError
                    ) {
                        setErrorColor(true);
                        setValidMessage(true);
                        setMessageValid(error.response.data.message);
                    } else {
                        console.log(error);
                    }
                });
            setTimeout(function () {
                setMessageValid('');
                setBlock(false);
            }, 3000);
        }
    };
    const handleOpenValid = () => {
        setOpenValid(true);
    };
    const handleCloseValid = () => {
        setOpenValid(false);
    };
    const handleClickOpen = () => {
        setMessage('');
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = () => {
        setBlock(true);
        if (!validateEmail(email)) {
            setIsValid(true);
            setBlock(false);
            setMessage('Mail không đúng định dạng, làm ơn nhập đúng email');
        } else {
            setIsValid(false);
            setMessage('Đang xử lý');
            axios({
                method: 'POST',
                url: `${serverHost}/gen/otp/${email}`,
                responseType: 'json'
            })
                .then(function (res) {
                    setSendOtp(true);
                    console.log(res);
                })
                .catch(function (error) {
                    setSendOtp(false);
                    setIsValid(true);
                    // console.log(error);
                    setMessage(error.response.data.message);
                });
            setBlock(false);
            setTimeout(function () {
                setMessage('');
            }, 3000);
            setIsValid(false);
        }
    };
    const handleSignIn = () => {
        if (!validateEmail(username)) {
            enqueueSnackbar('Tài khoản không hợp lệ', { variant: 'error', autoHideDuration: 3000 });
        } else if (!validatePassword(password)) {
            enqueueSnackbar('Mật khẩu phải gồm ít nhất 8 ký tự gồm chữ cái, số và ít nhất 1 ký tự đặc biệt', {
                variant: 'error',
                autoHideDuration: 4000
            });
        } else {
            setBlock(true);

            axios({
                method: 'POST',
                url: `${serverHost}/login`,
                responseType: 'json',
                data: {
                    email: username, // encode with base64 định dạng
                    password: password // encode with base64 định dạng
                }
            })
                .then(function (response) {
                    if (response.status === HttpStatusCode.Ok) {
                        sessionStorage.setItem('accessToken', `${response.data.accessToken}`);
                        sessionStorage.setItem('refreshToken', `${response.data.refreshToken}`);
                        setIsAuth(true);
                        setUserData({ email: username, id: response.data.userInfo.id });
                        sessionStorage.setItem('id', response.data.userInfo.id);
                        setHeaderRequest(sessionStorage.getItem('accessToken'), sessionStorage.getItem('refreshToken'));
                    }
                    setBlock(false);
                })
                .catch(function (error) {
                    setBlock(false);
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
    };
    return (
        <>
            {' '}
            <CardHeader placeholder={''} variant='gradient' color='blue' className='mb-4 grid h-28 place-items-center'>
                <Typography placeholder='' variant='h3' color='white'>
                    Sign In
                </Typography>
            </CardHeader>
            <CardBody placeholder={''} className='flex flex-col gap-4'>
                <Input
                    crossOrigin={''}
                    label='Email'
                    size='lg'
                    color='blue'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={block}
                />
                <Input
                    crossOrigin={''}
                    type='password'
                    label='Password'
                    size='lg'
                    color='blue'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={block}
                />
                <div className='-ml-2.5'>
                    <Checkbox crossOrigin={''} label='Remember Me' />
                </div>
            </CardBody>
            <CardFooter placeholder={''} className='pt-0'>
                <Button placeholder={''} variant='gradient' color='light-blue' fullWidth onClick={handleSignIn} disabled={block}>
                    {block ? 'Signing In...' : 'Sign In'}
                </Button>
                <Typography placeholder='' variant='small' className='mt-6 flex justify-center'>
                    Bạn đã quên mật khẩu?
                    <Typography
                        placeholder=''
                        as='button'
                        variant='small'
                        color='blue-gray'
                        className='ml-1 font-bold'
                        onClick={handleClickOpen}
                    >
                        Gửi mật khẩu
                    </Typography>
                    <Dialog handler={handleClose} placeholder={''} open={open} aria-describedby='alert-dialog-slide-description'>
                        <DialogHeader placeholder={''}>{'Bạn muốn lấy lại mật khẩu?'}</DialogHeader>
                        <DialogBody placeholder={''}>
                            {sendOtp ? (
                                <Typography
                                    placeholder=''
                                    as='p'
                                    variant='small'
                                    color='purple'
                                    className='ml-1 font-bold text-md mb-5 drop-shadow-lg'
                                >
                                    Chúng tôi đã gửi mã OTP cho bạn thông qua mail bạn cung cấp vui lòng check kỹ mail (kể cả thư mục spam)
                                </Typography>
                            ) : (
                                <div>
                                    <Typography
                                        placeholder=''
                                        as='p'
                                        variant='small'
                                        color='blue-gray'
                                        className='ml-1 font-bold text-md mb-5'
                                    >
                                        Hãy nhập email:{' '}
                                    </Typography>
                                    <Input
                                        crossOrigin={''}
                                        label='Email'
                                        size='lg'
                                        color='blue'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={block}
                                    />
                                </div>
                            )}
                        </DialogBody>
                        {isValid ? (
                            <Typography
                                placeholder=''
                                as='p'
                                variant='small'
                                color='blue-gray'
                                className='ml-1 font-bold text-sm mt-2 mr-5 text-red-400 text-center'
                            >
                                {message}
                            </Typography>
                        ) : (
                            ''
                        )}
                        <DialogFooter placeholder={''}>
                            {sendOtp ? (
                                <Button placeholder={''} onClick={handleClose}>
                                    OK
                                </Button>
                            ) : (
                                <Button placeholder={''} onClick={handleSubmit} disabled={block}>
                                    Xác nhận
                                </Button>
                            )}
                        </DialogFooter>
                    </Dialog>
                </Typography>
                <div className='mt-3 flex items-center'>
                    <div className='flex-grow border-t border-gray-300'></div>
                    <span className='mx-4 text-md text-gray-800'>Or</span>
                    <div className='flex-grow border-t border-gray-300'></div>
                </div>
                <Typography
                    placeholder=''
                    as='button'
                    variant='small'
                    className='mt-6 mx-auto font-bold hover:font-extrabold active:font-semibold drop-shadow-lg'
                    onClick={handleOpenValid}
                >
                    Xác thực tài khoản
                </Typography>
                <Dialog handler={handleCloseValid} placeholder={''} open={openValid} aria-describedby='alert-dialog-slide-description'>
                    <DialogHeader placeholder={''}>{'Xác thực tài khoản và đổi mật khẩu'}</DialogHeader>
                    <DialogBody placeholder={''}>
                        <div>
                            <Typography placeholder='' as='p' variant='small' color='blue-gray' className='ml-1 font-bold text-md my-3'>
                                Email:{' '}
                            </Typography>
                            <Input
                                crossOrigin={''}
                                label='Email'
                                size='lg'
                                color='blue'
                                value={emailValid}
                                onChange={(e) => setEmailValid(e.target.value)}
                                disabled={block}
                            />
                            <Typography placeholder='' as='p' variant='small' color='blue-gray' className='ml-1 font-bold text-md my-3'>
                                Nhập mật khẩu mới:{' '}
                            </Typography>
                            <Input
                                crossOrigin={''}
                                label='nhập mật khẩu mới!'
                                size='lg'
                                color='blue'
                                type='password'
                                value={inputValid}
                                onChange={(e) => setInputValid(e.target.value)}
                                disabled={block}
                            />
                            <Typography placeholder='' as='p' variant='small' color='blue-gray' className='ml-1 font-bold text-md my-3'>
                                Nhập lại mật khẩu:{' '}
                            </Typography>
                            <Input
                                crossOrigin={''}
                                label='Nhập lại mật khẩu mới!'
                                size='lg'
                                color='blue'
                                type='password'
                                value={inputRecheck}
                                onChange={(e) => setInputRecheck(e.target.value)}
                                disabled={block}
                            />
                            <Typography placeholder='' as='p' variant='small' color='blue-gray' className='ml-1 font-bold text-md my-3'>
                                Mã OTP:{' '}
                            </Typography>
                            <Input
                                crossOrigin={''}
                                label='OTP'
                                size='lg'
                                type='number'
                                color='blue'
                                value={otp}
                                maxLength={6}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    if (inputValue.length <= 6) {
                                        // Check if input length is less than or equal to 6
                                        setOtp(parseInt(inputValue, 10)); // Parse input value to integer and update state
                                    }
                                }}
                                disabled={block}
                            />
                        </div>
                    </DialogBody>
                    {validMessage ? (
                        <Typography
                            placeholder=''
                            as='p'
                            variant='small'
                            color={errorColor ? 'yellow' : 'cyan'}
                            className='ml-1 font-bold text-sm mt-2 mr-5 text-center'
                        >
                            {messageValid}
                        </Typography>
                    ) : (
                        ''
                    )}
                    <DialogFooter placeholder={''}>
                        <div>
                            <Button placeholder={''} onClick={resendOtp} className='mr-4 text-green-400' disabled={block}>
                                Gửi lại OTP
                            </Button>
                            <Button placeholder={''} onClick={handleSubmitValid} disabled={block}>
                                Xác nhận
                            </Button>
                        </div>
                    </DialogFooter>
                </Dialog>
            </CardFooter>
        </>
    );
}
