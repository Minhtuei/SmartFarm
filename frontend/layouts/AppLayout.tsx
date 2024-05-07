import { AppSlideMenu } from '@fe/components';
import { useMemo, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { useScreenSize } from '@fe/hooks';
import { useDevicesStore } from '@fe/states';
import { useNotificationStore } from '@fe/states';
import { useUserInfoStore } from '@fe/states';
import { useResponsiveStore } from '@fe/states';
import { Dialog, Button } from '@material-tailwind/react';
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
    const limit = screen.screenSize >= 2 ? 20 : 10;

    useEffect(() => {
        const fetchDashboard = async () => {
            getDeviceInfos(userData.id, limit);
        };
        // Call immediately
        fetchDashboard(); // Then call every 15 seconds
        const interval = setInterval(() => {
            fetchDashboard();
        }, 15000); // Interval of 15 seconds

        return () => clearInterval(interval); // Clear the interval if the component unmounts
    }, [userData, limit]);
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
    let MARGIN_LEFT = '0';
    if (open && screen.screenSize >= 2) {
        MARGIN_LEFT = '240px';
    } else if (!open && screen.screenSize >= 2) {
        MARGIN_LEFT = '64px';
    }
    const { hideSideBar, setHideSideBar } = useResponsiveStore();
    const [openDialog, setOpenDialog] = useState(true);
    useEffect(() => {
        if (screen.screenSize < 2) {
            setHideSideBar(true);
        } else {
            setHideSideBar(false);
        }
    }, [screen.screenSize]);
    return (
        <div>
            {!hideSideBar && <AppSlideMenu menu={menu} open={open} setOpen={setOpen} />}
            {sessionStorage.getItem('refreshToken') ? (
                <div className='dark:bg-black/1' style={{ marginLeft: MARGIN_LEFT }}>
                    <Routes>
                        {routeItems.map((item) => (
                            <Route path={item.path} element={item.element} key={item.path} />
                        ))}
                    </Routes>
                </div>
            ) : (
                <Dialog placeholder={''} open={openDialog} handler={setOpenDialog} title='Thông báo' color='red'>
                    <div className='p-5'>
                        <p className='text-center'>Phiên làm việc của bạn đã hết hạn</p>
                        <Button
                            placeholder=''
                            color='red'
                            className='w-full mt-5'
                            onClick={() => {
                                sessionStorage.removeItem('accessToken');
                                window.location.reload();
                                setOpenDialog(false);
                            }}
                        >
                            Đăng nhập lại
                        </Button>
                    </div>
                </Dialog>
            )}
        </div>
    );
};
