import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useUserInfoStore = create<UserStore>()(
    devtools((set) => ({
        isAuth: false,
        userData: {
            email: ''
        },
        setIsAuth: (isAuth: boolean) => set({ isAuth }),
        setUserData: (userData: UserData) => set({ userData })
    }))
);
