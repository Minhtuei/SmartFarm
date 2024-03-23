type BaseRoute = {
    icon: React.ReactElement;
    name: string;
};

type RoutesList = BaseRoute & {
    type: 'list';
    routes: RouteItem[];
};

type RouteItem = BaseRoute & {
    type: 'item';
    path: string;
    element: React.ReactElement;
};

type RouteSkeleton = {
    name: string;
    type: 'skeleton';
    path: string;
    element: React.ReactElement;
};

type LogoutBtn = BaseRoute & {
    type: 'logout-btn';
    onClick: () => void;
};

type RouteMenuItem = RouteItem | RoutesList | 'divider' | LogoutBtn | RouteSkeleton;

type RouteMenu = RouteMenuItem[];
