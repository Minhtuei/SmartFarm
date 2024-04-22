import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useUserInfoStore = create<UserStore>()(
    devtools((set) => ({
        isAuth: true || (sessionStorage.getItem('accessToken') !== null && sessionStorage.getItem('accessToken') !== undefined),
        userData: {
            id: '',
            email: ''
        },
        setIsAuth: (isAuth: boolean) => set({ isAuth }),
        setUserData: (userData: UserData) => set({ userData })
    }))
);
