import { Navbar, Typography, IconButton } from '@material-tailwind/react';
import { SunIcon } from '@heroicons/react/20/solid';
import { Switch } from '@material-tailwind/react';
import { NotificationsMenu, ProfileMenu } from '@fe/components';
import { MoonIcon } from '@heroicons/react/20/solid';
import { useDarkMode } from '@fe/hooks';
import { NotificationPopUp } from '../Notify/NotificationPopUp';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/20/solid';
import { useResponsiveStore } from '@fe/states';
export function AppNavigationBar({ title }: { title: string }) {
    const [darkMode, toggleDarkMode] = useDarkMode();
    const isHideSidebar = localStorage.getItem('isHideSidebar') === 'true';
    const rounded = isHideSidebar ? 'rounded-tl-none' : 'rounded-tl-2xl';
    const { setHideSideBar } = useResponsiveStore();
    return (
        <Navbar
            placeholder={undefined}
            className={`sticky top-0 z-[998] h-max max-w-full px-4 py-2 lg:px-8 lg:py-4 rounded-none !bg-white ${rounded} dark:!bg-black/1`}
        >
            <div className='flex flex-row  items-center  text-blue-gray-900'>
                {isHideSidebar && (
                    <IconButton
                        placeholder={''}
                        className='px-3 py-2 dark:bg-white '
                        onClick={() => {
                            setHideSideBar(false);
                            localStorage.setItem('isHideSidebar', 'false');
                        }}
                    >
                        <AdjustmentsHorizontalIcon className='w-6 h-6 dark:text-[#333]' />
                    </IconButton>
                )}
                <Typography placeholder={''} variant='h3' className='hidden lg:block font-bold italic dark:text-white mr-0'>
                    {title}
                </Typography>
                <div className='flex items-center gap-4 ml-auto'>
                    <div className='flex items-center gap-x-3 '>
                        <Switch color='green' crossOrigin={''} defaultChecked={darkMode === false} onChange={toggleDarkMode} />
                        {darkMode ? <MoonIcon className='w-6 h-6 dark:text-white' /> : <SunIcon className='w-6 h-6 text-yellow-700 ' />}
                        <NotificationsMenu />
                        <ProfileMenu />
                    </div>
                </div>
            </div>
            <div className='absolute right-0 -bottom-[1.5rem] -translate-x-[20px] translate-y-[80px]'>
                <NotificationPopUp />
            </div>
        </Navbar>
    );
}
