import { create } from 'zustand';
type ResponsiveStore = {
    hideSideBar: boolean;
    setHideSideBar: (hide: boolean) => void;
    darkMode: boolean;
    setDarkMode: (dark: boolean) => void;
};

export const useResponsiveStore = create<ResponsiveStore>((set) => ({
    hideSideBar: localStorage.getItem('isHideSidebar') === 'true',
    setHideSideBar: (hide) => {
        set({ hideSideBar: hide });
        localStorage.setItem('isHideSidebar', hide ? 'true' : 'false');
    },
    darkMode: localStorage.getItem('darkMode') === 'true',
    setDarkMode: (dark) => {
        set({ darkMode: dark });
        localStorage.setItem('darkMode', dark ? 'true' : 'false');
    }
}));
