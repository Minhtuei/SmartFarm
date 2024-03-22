import { Navbar, Typography } from '@material-tailwind/react';
import { SunIcon } from '@heroicons/react/20/solid';
import { Switch } from '@material-tailwind/react';
import { NotificationsMenu, ProfileMenu } from '@fe/components';
import { MoonIcon } from '@heroicons/react/20/solid';
import { useDarkMode } from '@fe/hooks';
export function AppNavigationBar({ title }: { title: string }) {
    const [darkMode, toggleDarkMode] = useDarkMode();
    return (
        <Navbar
            placeholder={undefined}
            className='sticky top-0 z-10 h-max max-w-full px-4 py-2 lg:px-8 lg:py-4 rounded-none !bg-white rounded-tl-2xl dark:!bg-black/1'
        >
            <div className='flex flex-row-reverse lg:flex-row items-center justify-between text-blue-gray-900'>
                <Typography placeholder={''} variant='h3' className='hidden lg:block font-bold italic dark:text-white'>
                    {title}
                </Typography>
                <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-x-3'>
                        <Switch color='green' crossOrigin={''} defaultChecked={darkMode === false} onChange={toggleDarkMode} />
                        {darkMode ? <MoonIcon className='w-6 h-6 dark:text-white' /> : <SunIcon className='w-6 h-6 text-yellow-700 ' />}
                        <NotificationsMenu />
                        <ProfileMenu />
                    </div>
                </div>
            </div>
        </Navbar>
    );
}
