import { Card, CardHeader, CardBody, CardFooter, Typography, Input, Checkbox, Button } from '@material-tailwind/react';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';

export function LoginCard() {
    const [username, setUsername] = useState<string | number>('');
    const [password, setPassword] = useState<string>('');
    const [block, setBlock] = useState<boolean>(false);
    const validateUsername = (username: string): boolean => {
        // Regular expression to check if the username is in email format
        const emailPattern = /^[\w\.-]+@[\w\.-]+\.\w+$/;
        return emailPattern.test(username);
    };

    const validatePassword = (password: string): boolean => {
        // Regular expressions to check if the password meets the criteria
        const lengthCheck = password.length >= 8;
        const charCheck = /[a-zA-Z]/.test(password);
        const numCheck = /\d/.test(password);
        const specialCharCheck = /[!@#$%^&*()-_=+]/.test(password);

        return lengthCheck && charCheck && numCheck && specialCharCheck;
    };

    const handleSignIn = () => {
        if (!validateUsername(username)) {
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
            }, 2000);
            // Perform sign-in logic here
        }
    };
    return (
        <div className='w-full h-[100vh] bg-gradient-to-r from-green/1 to-gray-900'>
            <Card className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] sm:w-[30vw]'>
                <CardHeader variant='gradient' color='blue' className='mb-4 grid h-28 place-items-center'>
                    <Typography variant='h3' color='white'>
                        Sign In
                    </Typography>
                </CardHeader>
                <CardBody className='flex flex-col gap-4'>
                    <Input
                        label='Email'
                        size='lg'
                        color='blue'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={block}
                    />
                    <Input
                        type='password'
                        label='Password'
                        size='lg'
                        color='blue'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={block}
                    />
                    <div className='-ml-2.5'>
                        <Checkbox label='Remember Me' />
                    </div>
                </CardBody>
                <CardFooter className='pt-0'>
                    <Button variant='gradient' color='light-blue' fullWidth onClick={handleSignIn} disabled={block}>
                        {block ? 'Signing In...' : 'Sign In'}
                    </Button>
                    <div className='mt-3 flex items-center'>
                        <div className='flex-grow border-t border-gray-300'></div>
                        <span className='mx-4 text-md text-gray-800'>Or</span>
                        <div className='flex-grow border-t border-gray-300'></div>
                    </div>
                    <Button variant='outlined' color='deep-purple' className='mt-3 flex justify-center items-center gap-3' fullWidth>
                        <p className='color-slate-50'>Login with Google</p>
                        <FcGoogle className='text-xl' />
                    </Button>
                    <Typography variant='small' className='mt-6 flex justify-center'>
                        Don&apos;t have an account?
                        <Typography as='a' href='#signup' variant='small' color='blue-gray' className='ml-1 font-bold'>
                            Sign up
                        </Typography>
                    </Typography>
                </CardFooter>
            </Card>
            <div>
                <SnackbarProvider maxSnack={3} />
            </div>
        </div>
    );
}
