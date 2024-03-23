import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useUserInfoStore } from '@fe/states';
import { Navigate } from 'react-router-dom';
export const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
    const pathname = useLocation();
    const { isAuth } = useUserInfoStore();
    return isAuth ? children : <Navigate to='/login' state={{ from: pathname.pathname }} replace />;
};
