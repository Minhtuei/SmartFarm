import { CardHeader, CardBody, CardFooter, Typography, Input, Checkbox, Button } from '@material-tailwind/react';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { enqueueSnackbar } from 'notistack';
import { validateEmail, validatePassword } from '@fe/utils';
import { useUserInfoStore } from '@fe/states';
import { HttpStatusCode } from 'axios';
import { setHeaderRequest } from '@fe/utils';
import axios from 'axios';
export function LoginPage() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [block, setBlock] = useState<boolean>(false);
    const { setUserData, setIsAuth } = useUserInfoStore();
    const serverHost = 'http://localhost:8080';
    const handleSignIn = () => {
        if (!validateEmail(username)) {
            enqueueSnackbar('Mail không đúng format, làm ơn nhập đúng email', { variant: 'error', autoHideDuration: 3000 });
        } else if (!validatePassword(password)) {
            enqueueSnackbar('Password phải ít nhất 8 ký tự gồm chữ cái, số và ít nhất 1 ký tự đặc biệt', {
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
                    email: username, // encode with base64 format
                    password: password // encode with base64 format
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

            // setTimeout(() => {
            //     setBlock(false);
            //     enqueueSnackbar('Sign In Successful', { variant: 'success', autoHideDuration: 1000 });
            //     if (password === 'tue@1234') {
            //         setIsAuth(true);
            //         setUserData({ email: username });
            //     }
            // }, 2000);
            // Perform sign-in logic here
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
                <div className='mt-3 flex items-center'>
                    <div className='flex-grow border-t border-gray-300'></div>
                    <span className='mx-4 text-md text-gray-800'>Or</span>
                    <div className='flex-grow border-t border-gray-300'></div>
                </div>
                <Button
                    placeholder={''}
                    variant='outlined'
                    color='deep-purple'
                    className='mt-3 flex justify-center items-center gap-3'
                    fullWidth
                    disabled={block}
                >
                    <p className='color-slate-50'>Login with Google</p>
                    <FcGoogle className='text-xl' />
                </Button>
                <Typography placeholder='' variant='small' className='mt-6 flex justify-center'>
                    Forgot your password?
                    <Typography placeholder='' as='a' href='#signup' variant='small' color='blue-gray' className='ml-1 font-bold'>
                        Reset it
                    </Typography>
                </Typography>
            </CardFooter>
        </>
    );
}
