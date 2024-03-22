import React from 'react';
import { AppLayout } from '@fe/layouts';
import { DashboardPage, DevicePage, HelpPage, NotificationPage, ProfilePage, LoginCard } from '@fe/pages'; // Import LoginCard
import { ChartBarIcon, ComputerDesktopIcon, EnvelopeIcon, QuestionMarkCircleIcon, UserIcon } from '@heroicons/react/20/solid';
import { Routes, Route } from 'react-router-dom';

export default function App() {
    return (
        <div className='bg-green-100 dark:bg-black-100'>
            <Routes>
                <Route path='/login' element={<LoginCard />} />
            </Routes>
            <AppLayout
                menu={[
                    {
                        type: 'item',
                        icon: <ChartBarIcon className='h-5 w-5' />,
                        path: '/',
                        name: 'Dashboard',
                        element: <DashboardPage />
                    },
                    {
                        type: 'item',
                        icon: <UserIcon className='h-5 w-5' />,
                        path: '/profile',
                        name: 'Profile',
                        element: <ProfilePage />
                    },
                    {
                        type: 'item',
                        icon: <ComputerDesktopIcon className='h-5 w-5' />,
                        path: '/device',
                        name: 'Device',
                        element: <DevicePage />
                    },
                    {
                        type: 'item',
                        icon: <EnvelopeIcon className='h-5 w-5' />,
                        path: '/notification',
                        name: 'Notification',
                        element: <NotificationPage />
                    },
                    {
                        type: 'item',
                        icon: <QuestionMarkCircleIcon className='h-5 w-5' />,
                        path: '/help',
                        name: 'Help',
                        element: <HelpPage />
                    }
                ]}
            />
        </div>
    );
}
