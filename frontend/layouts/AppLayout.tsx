import { AppSlideMenu } from '@fe/components';
import { useMemo, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { useScreenSize } from '@fe/hooks';
import { useDevicesStore } from '@fe/states';
import { useNotificationStore } from '@fe/states';
import { useUserInfoStore } from '@fe/states';
export const AppLayout: Component<{ menu: RouteMenu }> = function ({ menu }) {
    const screen = useScreenSize();
    const routeItems = useMemo(() => {
        const items: { path: string; element: React.ReactElement }[] = [];
        for (const menuItem of menu) {
            if (menuItem === 'divider' || menuItem.type === 'logout-btn') continue;
            if (menuItem.type === 'list') {
                for (const route of menuItem.routes) {
                    items.push({ path: route.path, element: route.element });
                }
            } else {
                items.push({ path: menuItem.path, element: menuItem.element });
            }
        }
        return items;
    }, [menu]);
    const { userData } = useUserInfoStore();
    const { getDeviceInfos } = useDevicesStore();
    const { getNotifications, getLatestNotification } = useNotificationStore();
    useEffect(() => {
        const fetchDashboard = async () => {
            getDeviceInfos(userData.id, 20);
        };
        // Call immediately
        fetchDashboard(); // Then call every 3 seconds
        const interval = setInterval(() => {
            fetchDashboard();
        }, 10000); // Interval of 3 seconds

        return () => clearInterval(interval); // Clear the interval if the component unmounts
    }, [userData]);
    useEffect(() => {
        const fetchNotification = async () => {
            if (!userData) return;
            await getNotifications(userData.id);
            const interval = setInterval(() => {
                getLatestNotification(userData.id);
            }, 3000);
            return () => clearInterval(interval);
        };
        fetchNotification();
    }, [userData]);

    const [open, setOpen] = useState(true);
    return (
        <div>
            <AppSlideMenu menu={menu} open={open} setOpen={setOpen} />
            <div className='dark:bg-black/1' style={{ marginLeft: open && screen.screenSize >= 2 ? '240px' : '64px' }}>
                <Routes>
                    {routeItems.map((item) => (
                        <Route path={item.path} element={item.element} key={item.path} />
                    ))}
                </Routes>
            </div>
        </div>
    );
};
