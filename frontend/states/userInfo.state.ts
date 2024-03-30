import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useUserInfoStore = create<UserStore>()(
    devtools((set) => ({
        isAuth: sessionStorage.getItem('token') !== null && sessionStorage.getItem('token') !== undefined,
        userData: {
            email: ''
        },
        setIsAuth: (isAuth: boolean) => set({ isAuth }),
        setUserData: (userData: UserData) => set({ userData })
    }))
);
