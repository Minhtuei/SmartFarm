import { CardHeader, CardBody, CardFooter, Typography, Input, Checkbox, Button } from '@material-tailwind/react';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { enqueueSnackbar } from 'notistack';
import { validateEmail, validatePassword } from '@fe/utils';
import { useUserInfoStore } from '@fe/states';
export function LoginPage() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [block, setBlock] = useState<boolean>(false);
    const { setUserData, setIsAuth } = useUserInfoStore();
    const handleSignIn = () => {
        if (!validateEmail(username)) {
            enqueueSnackbar('Invalid email format. Please enter a valid email.', { variant: 'error', autoHideDuration: 3000 });
        } else if (!validatePassword(password)) {
            enqueueSnackbar(
                'Password must be at least 8 characters long and contain at least one letter, one number, and one special character.',
                { variant: 'error', autoHideDuration: 4000 }
            );
        } else {
            setBlock(true);
            setTimeout(() => {
                setBlock(false);
                enqueueSnackbar('Sign In Successful', { variant: 'success', autoHideDuration: 1000 });
                if (password === 'tue@1234') {
                    setIsAuth(true);
                    setUserData({ email: username });
                }
            }, 2000);
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
