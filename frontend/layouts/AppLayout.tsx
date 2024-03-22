import { AppSlideMenu } from '@fe/components';
import { useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { useScreenSize } from '@fe/hooks';
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
    const [open, setOpen] = useState(true);
    return (
        <div>
            <AppSlideMenu menu={menu} open={open} setOpen={setOpen} />
            <div style={{ marginLeft: open && screen.screenSize >= 2 ? '240px' : '64px' }}>
                <Routes>
                    {routeItems.map((item) => (
                        <Route path={item.path} element={item.element} key={item.path} />
                    ))}
                </Routes>
            </div>
        </div>
    );
};
