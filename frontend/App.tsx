import { AppLayout } from '@fe/layouts';
import { DashboardPage, DevicePage, HelpPage, NotificationPage, ProfilePage } from '@fe/pages';
import { ChartBarIcon, ComputerDesktopIcon, EnvelopeIcon, QuestionMarkCircleIcon, UserIcon } from '@heroicons/react/20/solid';
export default function App() {
    return (
        <div className='bg-green/1 dark:bg-black/1'>
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
