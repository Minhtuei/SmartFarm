import { AppLayout } from '@fe/layouts';
import { DashboardPage, DevicePage, HelpPage, LoginPage, NotificationPage, ProfilePage } from '@fe/pages'; // Import LoginCard
import { useUserInfoStore } from '@fe/states';
import { ChartBarIcon, ComputerDesktopIcon, EnvelopeIcon, QuestionMarkCircleIcon, UserIcon } from '@heroicons/react/20/solid';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppSkeleton } from './components';
import { AuthLayout } from './layouts/AuthLayout';
import { useDevicesStore } from '@fe/states';
export default function App() {
    const navigate = useNavigate();
    const pathname = useLocation();
    const { isAuth } = useUserInfoStore();
    const { getDeviceInfos } = useDevicesStore();
    useEffect(() => {
        if (pathname.pathname === '/' && isAuth) {
            navigate('/dashboard');
        }
    }, [pathname, navigate, isAuth]);
    useEffect(() => {
        const fetchDashboard = async () => {
            await getDeviceInfos();
        };
        // Call immediately
        fetchDashboard(); // Then call every 3 seconds
        const interval = setInterval(() => {
            fetchDashboard();
        }, 10000); // Interval of 3 seconds

        return () => clearInterval(interval); // Clear the interval if the component unmounts
    }, []);

    if (!isAuth) {
        return (
            <AuthLayout>
                <LoginPage />
            </AuthLayout>
        );
    }

    return (
        <div className='bg-green/1 dark:bg-black-100'>
            <AppLayout
                menu={[
                    {
                        type: 'skeleton',
                        path: '/',
                        name: 'Skeleton',
                        element: <AppSkeleton />
                    },
                    {
                        type: 'item',
                        icon: <ChartBarIcon className='h-5 w-5' />,
                        path: '/dashboard' || '/',
                        name: 'Dashboard',
                        element: <DashboardPage />,
                        isActive: pathname.pathname === '/dashboard' || pathname.pathname === '/'
                    },
                    {
                        type: 'item',
                        icon: <UserIcon className='h-5 w-5' />,
                        path: '/profile',
                        name: 'Profile',
                        element: <ProfilePage />,
                        isActive: pathname.pathname === '/profile'
                    },
                    {
                        type: 'item',
                        icon: <ComputerDesktopIcon className='h-5 w-5' />,
                        path: '/device/*',
                        name: 'Device',
                        element: <DevicePage />,
                        isActive: pathname.pathname === '/device/*'
                    },
                    {
                        type: 'item',
                        icon: <EnvelopeIcon className='h-5 w-5' />,
                        path: '/notification',
                        name: 'Notification',
                        element: <NotificationPage />,
                        isActive: pathname.pathname === '/notification'
                    },
                    {
                        type: 'item',
                        icon: <QuestionMarkCircleIcon className='h-5 w-5' />,
                        path: '/help',
                        name: 'Help',
                        element: <HelpPage />,
                        isActive: pathname.pathname === '/help'
                    }
                ]}
            />
        </div>
    );
}
