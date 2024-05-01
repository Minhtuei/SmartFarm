import { AppLayout } from '@fe/layouts';
import { DashboardPage, DevicePage, HelpPage, LoginPage, NotificationPage, ProfilePage } from '@fe/pages'; // Import LoginCard
import { useUserInfoStore } from '@fe/states';
import { ChartBarIcon, ComputerDesktopIcon, EnvelopeIcon, QuestionMarkCircleIcon, UserIcon } from '@heroicons/react/20/solid';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppSkeleton } from './components';
import { AuthLayout } from './layouts/AuthLayout';

export default function App() {
    const navigate = useNavigate();
    const pathname = useLocation();
    const { isAuth } = useUserInfoStore();

    useEffect(() => {
        if (pathname.pathname === '/' && isAuth) {
            navigate('/dashboard');
        }
    }, [pathname, navigate, isAuth]);

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
                        name: 'Thống kê',
                        element: <DashboardPage />,
                        isActive: pathname.pathname === '/dashboard' || pathname.pathname === '/'
                    },
                    {
                        type: 'item',
                        icon: <UserIcon className='h-5 w-5' />,
                        path: '/profile',
                        name: 'Cá nhân',
                        element: <ProfilePage />,
                        isActive: pathname.pathname === '/profile'
                    },
                    {
                        type: 'item',
                        icon: <ComputerDesktopIcon className='h-5 w-5' />,
                        path: '/device/*',
                        name: 'Thiết bị',
                        element: <DevicePage />,
                        isActive: pathname.pathname === '/device/*'
                    },
                    {
                        type: 'item',
                        icon: <EnvelopeIcon className='h-5 w-5' />,
                        path: '/notification',
                        name: 'Thông báo',
                        element: <NotificationPage />,
                        isActive: pathname.pathname === '/notification'
                    },
                    {
                        type: 'item',
                        icon: <QuestionMarkCircleIcon className='h-5 w-5' />,
                        path: '/help',
                        name: 'Trợ giúp',
                        element: <HelpPage />,
                        isActive: pathname.pathname === '/help'
                    }
                ]}
            />
        </div>
    );
}
